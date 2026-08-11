import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useAnimations';

interface Post {
  id: string;
  image: string;
  alt: string;
  avatar: string;
  username: string;
  handle: string;
  headline: string;
  subtext: string;
  hashtags: string;
  likes: string;
  comments: string;
  time: string;
  emoji: string;
}

const posts: Post[] = [
  {
    id: 'post-farmer',
    image: '/farmer.png',
    alt: 'सूर्यपुरा का किसान — खेतों में',
    avatar: '👨‍🌾',
    username: 'सूर्यपुरा ग्राम',
    handle: '@suryapura_gram',
    headline: 'किसान मजबूत, तो सूर्यपुरा मजबूत। 🌾',
    subtext: 'बेहतर जानकारी • बेहतर अवसर • बेहतर भविष्य',
    hashtags: '#Suryapura #KisanVikas #RuralDevelopment',
    likes: '1.2K',
    comments: '84',
    time: '2 घंटे पहले',
    emoji: '🌾',
  },
  {
    id: 'post-edu',
    image: '/education.png',
    alt: 'सूर्यपुरा के विद्यार्थी डिजिटल शिक्षा में',
    avatar: '📚',
    username: 'सूर्यपुरा ग्राम',
    handle: '@suryapura_gram',
    headline: 'हर बच्चे का सपना, सूर्यपुरा की जिम्मेदारी। 📚',
    subtext: 'शिक्षा से गांव का भविष्य बदलता है।',
    hashtags: '#Suryapura #Education #DigitalVillage',
    likes: '986',
    comments: '62',
    time: '1 दिन पहले',
    emoji: '📚',
  },
];

const SocialMediaPreview: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver(0.12);

  return (
    <section id="social" className="section-py bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-badge mb-4">सोशल मीडिया</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal font-hindi mt-3 mb-4">
            सूर्यपुरा <span className="text-forest-green">सोशल</span>
          </h2>
          <p className="text-muted-green font-hindi">गांव की खबरें, सीधे आप तक।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {posts.map((post, i) => (
            <div
              key={post.id}
              id={post.id}
              className={`instagram-card transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-warm-yellow to-earth-brown rounded-full flex items-center justify-center text-lg">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-charcoal text-sm font-hindi">{post.username}</p>
                  <p className="text-muted-green text-xs font-inter">{post.handle}</p>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className="flex flex-col gap-0.5">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="w-1 h-1 bg-charcoal/40 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
                <img
                  src={post.image}
                  alt={post.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-lg font-hindi drop-shadow-lg">{post.headline}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4">
                <div className="flex items-center gap-4 mb-3">
                  <button className="group" aria-label="पसंद">
                    <Heart size={22} className="text-charcoal/60 group-hover:text-red-500 transition-colors" />
                  </button>
                  <button className="group" aria-label="टिप्पणी">
                    <MessageCircle size={22} className="text-charcoal/60 group-hover:text-forest-green transition-colors" />
                  </button>
                  <button className="group" aria-label="साझा करें">
                    <Share2 size={22} className="text-charcoal/60 group-hover:text-forest-green transition-colors" />
                  </button>
                  <div className="ml-auto">
                    <button className="group" aria-label="सहेजें">
                      <Bookmark size={22} className="text-charcoal/60 group-hover:text-forest-green transition-colors" />
                    </button>
                  </div>
                </div>

                {/* Likes */}
                <p className="font-bold text-charcoal text-sm font-inter mb-2">{post.likes} likes</p>

                {/* Caption */}
                <p className="text-charcoal text-sm font-hindi mb-1">
                  <span className="font-bold">सूर्यपुरा ग्राम</span> {post.subtext}
                </p>
                <p className="text-forest-green text-sm font-inter">{post.hashtags}</p>

                {/* Comments */}
                <p className="text-muted-green text-xs mt-2 font-hindi">
                  {post.comments} comments देखें
                </p>
                <p className="text-muted-green/60 text-xs font-hindi">{post.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaPreview;
