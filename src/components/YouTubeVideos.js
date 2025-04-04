import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const channelId = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!apiKey || !channelId) {
          throw new Error("YouTube API configuration is missing");
        }

        // First, get the uploads playlist ID for the channel
        const channelResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
        );

        if (!channelResponse.ok) {
          throw new Error(`YouTube API error: ${channelResponse.status}`);
        }

        const channelData = await channelResponse.json();

        // Debug log
        // console.log('Channel Data:', channelData);

        // Check if we got valid channel data
        if (!channelData.items || channelData.items.length === 0) {
          throw new Error("No channel found with the provided ID");
        }

        const uploadsPlaylistId =
          channelData.items[0].contentDetails?.relatedPlaylists?.uploads;

        if (!uploadsPlaylistId) {
          throw new Error("This channel has no uploads playlist");
        }

        // Now get the videos from the uploads playlist
        const videosResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=6&playlistId=${uploadsPlaylistId}&key=${apiKey}`
        );

        if (!videosResponse.ok) {
          throw new Error(`YouTube API error: ${videosResponse.status}`);
        }

        const videosData = await videosResponse.json();

        // Debug log
        // console.log('Videos Data:', videosData);

        if (!videosData.items || videosData.items.length === 0) {
          throw new Error("No videos found in the uploads playlist");
        }

        setVideos(videosData.items);
      } catch (err) {
        setError(err.message);
        console.error("YouTube API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [apiKey, channelId]);

  // Render methods remain the same as previous solution
  if (!apiKey || !channelId) {
    return (
      <Alert variant="danger" className="my-4">
        YouTube API is not properly configured. Please check your environment
        variables.
      </Alert>
    );
  }

  if (loading) {
    return (
      <div aria-live="polite" aria-busy="true">
        <Spinner animation="border">
          <span className="visually-hidden">Loading videos...</span>
        </Spinner>
        <output className="visually-hidden">Loading YouTube videos...</output>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="warning" className="my-4">
        Could not load YouTube videos: {error}
        <div className="mt-2">
          <a
            href={`https://www.youtube.com/channel/${channelId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit YouTube Channel Directly
          </a>
        </div>
      </Alert>
    );
  }

  return (
    <section id="youtube-videos" className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-5">Educational Videos</h2>
        <Row>
          {videos.map((video) => (
            <Col key={video.id} md={6} lg={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <a
                  href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card.Img
                    variant="top"
                    src={
                      video.snippet.thumbnails?.medium?.url ||
                      "https://via.placeholder.com/320x180"
                    }
                    alt={video.snippet.title}
                    className="img-fluid"
                  />
                </a>
                <Card.Body>
                  <Card.Title className="fs-6">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none text-dark"
                    >
                      {video.snippet.title}
                    </a>
                  </Card.Title>
                  <Card.Text className="text-muted small">
                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <a
            href={`https://www.youtube.com/channel/${channelId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View More Videos on Our Channel
          </a>
        </div>
      </Container>
    </section>
  );
};

export default YouTubeVideos;
