import React, { useState } from 'react';
import './Blog.css';
import blog1 from '../../assets/blog-1.png';
import blog2 from '../../assets/blog-2.png';
import blog3 from '../../assets/blog-3.png';
import white_arrow from '../../assets/white-arrow.png';

const blogData = [
  {
    id: 1,
    title: 'Empowering Rural Education: Digital Classrooms Bring Hope to Remote Villages',
    date: 'July 24, 2026',
    author: 'Dr. Ananya Sharma',
    authorRole: 'Education Outreach Director',
    category: 'Education',
    readTime: '5 min read',
    image: blog1,
    excerpt: 'Discover how our digital literacy initiative equipped 15 rural schools with interactive learning tablets, unlocking new opportunities for over 2,000 children.',
    content: [
      'Education is the cornerstone of human progress, yet millions of children in remote and underserved regions lack access to quality learning tools and modern technology. Over the past six months, our organization launched the "Digital Horizon" initiative to bridge this digital divide.',
      'Through generous donor support, we provided over 500 interactive learning tablets pre-loaded with STEM curriculum, literacy modules, and creative problem-solving software. Teachers received intensive training on incorporating multimedia tools into daily lesson plans, transforming traditional classrooms into interactive hubs of curiosity.',
      'The results have been transformative: student attendance rose by 34%, and comprehension scores improved significantly. Local community elders and parents gathered to celebrate the first cohort of students graduating from the digital literacy program.',
      'Our goal for the coming year is to expand this initiative to 50 additional schools. Together with our global supporters, we are ensuring every child, regardless of geography, has the opportunity to learn, innovate, and thrive.'
    ]
  },
  {
    id: 2,
    title: 'Clean Water Initiative: Transforming Health & Lives in Rural Communities',
    date: 'July 18, 2026',
    author: 'Rajesh Kumar',
    authorRole: 'Community Health Lead',
    category: 'Health & Sanitation',
    readTime: '4 min read',
    image: blog2,
    excerpt: 'Safe drinking water is now a reality for over 5,000 villagers thanks to our newly installed solar-powered filtration plants.',
    content: [
      'Access to safe, clean drinking water is a fundamental human necessity. In many remote villages, waterborne diseases previously affected dozens of families every season due to contaminated ground sources.',
      'Our engineering and health teams collaborated with local leaders to build solar-powered water filtration units in 8 target villages. These eco-friendly stations purify thousands of liters of clean water daily using renewable energy.',
      'Local health clinics report a 60% drop in waterborne illnesses within the first month alone. Furthermore, women and children no longer have to walk long miles to fetch clean water, freeing up valuable time for school and economic activities.',
      'We continue to train local community committees to manage and maintain these filtration units independently, ensuring long-term sustainability and clean water for generations to come.'
    ]
  },
  {
    id: 3,
    title: 'Youth Leadership & Vocational Skills: Building Tomorrow\'s Change-Makers',
    date: 'July 10, 2026',
    author: 'Priya Patel',
    authorRole: 'Youth Empowerment Head',
    category: 'Youth & Development',
    readTime: '6 min read',
    image: blog3,
    excerpt: 'Our latest vocational bootcamp graduated 120 young adults with certifications in modern technology and sustainable business skills.',
    content: [
      'Empowering the youth with actionable, market-relevant skills is key to breaking cycles of poverty and building resilient communities.',
      'Our 12-week intensive Youth Leadership & Vocational Bootcamp focused on practical skills including basic web development, financial literacy, sustainable farming methods, and entrepreneurship. Mentored by industry professionals, participants worked on real-world community projects.',
      'Over 80% of our recent graduates have already secured apprenticeships, local jobs, or launched their own micro-businesses serving their communities.',
      'We believe in the power of youth to drive positive social change. With your continued support, we aim to mentor 500 more youth leaders in the upcoming program cycle.'
    ]
  }
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalPost, setActiveModalPost] = useState(null);

  const categories = ['All', 'Education', 'Health & Sanitation', 'Youth & Development'];

  const filteredPosts = selectedCategory === 'All'
    ? blogData
    : blogData.filter(post => post.category === selectedCategory);

  return (
    <div className="blog" id="blog">
      {/* Category Filter */}
      <div className="blog-categories">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`blog-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="blog-container">
        {filteredPosts.map((post) => (
          <div key={post.id} className="blog-card" onClick={() => setActiveModalPost(post)}>
            <div className="blog-img-wrapper">
              <img src={post.image} alt={post.title} className="blog-img" />
              <span className="blog-badge">{post.category}</span>
            </div>
            <div className="blog-info">
              <div className="blog-meta">
                <span>{post.date}</span> &bull; <span>{post.readTime}</span>
              </div>
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <div className="blog-footer">
                <div className="blog-author">
                  <div className="author-avatar">{post.author.charAt(0)}</div>
                  <div>
                    <span className="author-name">{post.author}</span>
                    <span className="author-role">{post.authorRole}</span>
                  </div>
                </div>
                <button className="read-more-btn">
                  Read Article <img src={white_arrow} alt="arrow" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Article Modal */}
      {activeModalPost && (
        <div className="blog-modal-overlay" onClick={() => setActiveModalPost(null)}>
          <div className="blog-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="blog-modal-close" onClick={() => setActiveModalPost(null)}>
              &times;
            </button>
            <div className="blog-modal-header">
              <span className="blog-modal-category">{activeModalPost.category}</span>
              <h2>{activeModalPost.title}</h2>
              <div className="blog-modal-meta">
                <span>By <strong>{activeModalPost.author}</strong> ({activeModalPost.authorRole})</span>
                <span>&bull; {activeModalPost.date} &bull; {activeModalPost.readTime}</span>
              </div>
            </div>

            <div className="blog-modal-img-container">
              <img src={activeModalPost.image} alt={activeModalPost.title} className="blog-modal-img" />
            </div>

            <div className="blog-modal-body">
              {activeModalPost.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="blog-modal-footer">
              <div className="share-tags">
                <span className="share-label">Tags:</span>
                <span className="tag">{activeModalPost.category}</span>
                <span className="tag">Community</span>
                <span className="tag">NGO Impact</span>
              </div>
              <button className="btn dark-btn" onClick={() => setActiveModalPost(null)}>
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
