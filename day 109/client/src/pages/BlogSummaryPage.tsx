import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/BlogSummaryPage.css';

interface BlogSummaryData {
  content: string;
  summary: string;
}

const BlogSummaryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) {
      setError('Invalid blog ID');
      setLoading(false);
      return;
    }

    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First fetch the blog content
        const blogResponse = await axios.get<BlogSummaryData>(`http://localhost:3000/getblogs/${id}`);
        const content = blogResponse.data.content;

        // Then get the summary
        const summaryResponse = await axios.post<{ summary: string }>(
          `http://localhost:3000/summary/blog-summary/${id}`,
          { content }
        );

        setSummary(summaryResponse.data.summary);
      } catch (err) {
        console.error('Error fetching summary:', err);
        setError('Failed to generate summary. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="summary-loading-container">
        <div className="summary-loading-spinner"></div>
        <p>Generating summary...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="summary-error-container">
        <div className="summary-error-alert">{error}</div>
        <Link to={`/blog-details/${id}`} className="summary-back-button">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-summary-container">
      <div className="summary-header">
        <h2>AI Generated Summary</h2>
        <button 
          onClick={handleCopy} 
          className="summary-copy-button" 
          title="Copy summary"
          aria-label="Copy summary to clipboard"
        >
          ⎘ Copy
        </button>
      </div>
      
      {copied && (
        <div className="summary-copied-alert">
          Summary copied to clipboard!
        </div>
      )}
      
      <div className="summary-content">
        <p>{summary}</p>
      </div>
      
      <div className="summary-back-link-container">
        <Link to={`/blog-details/${id}`} className="summary-back-link">
          ← Back to Full Blog Post
        </Link>
      </div>
    </div>
  );
};

export default BlogSummaryPage;;;

