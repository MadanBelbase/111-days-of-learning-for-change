import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BlogSummaryPage: React.FC = () => {
  const { id } = useParams();
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const blog = await axios.get(`http://localhost:3000/getblogs/${id}`);
        const content = blog.data.content;

        const response = await axios.post('http://localhost:3000/summary/blog-summary/:id', {
          content,
        });

        setSummary(response.data.summary);
      } catch (err) {
        console.error(err);
        setError('Failed to generate summary.');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [id]);

  if (loading) return <p>Loading summary...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>AI Generated Summary</h2>
      <p style={{ whiteSpace: 'pre-line', marginTop: '1rem' }}>{summary}</p>
      <Link to={`/blog-details/${id}`} style={{ display: 'inline-block', marginTop: '1rem' }}>
        🔙 Back to Blog
      </Link>
    </div>
  );
};

export default BlogSummaryPage;

