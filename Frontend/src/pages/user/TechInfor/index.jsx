import styles from './Blogs.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Blog1 from './blog1';
import Blog2 from './blog2';
import Blog3 from './blog3';
import Blog4 from './blog4';

const cx = classNames.bind(styles);

function Blogs() {
  const blogs = [
    {
      id: 1,
      image: '/images/slides/image1.avif',
      title: 'Trí tuệ nhân tạo và tương lai công nghệ',
      component: <Blog1 image='/images/slides/image1.avif' title='Trí tuệ nhân tạo và tương lai công nghệ'/>
    },
    {
      id: 2,
      image: '/images/slides/image2.avif',
      title: 'Chip bán dẫn – trái tim của thế giới số',
      component: <Blog2 image='/images/slides/image2.avif' title='Chip bán dẫn – trái tim của thế giới số'/>
    },
    {
      id: 3,
      image: '/images/slides/image3.avif',
      title: 'Máy tính lượng tử và tương lai tính toán',
      component: <Blog3 image='/images/slides/image3.avif' title='Máy tính lượng tử và tương lai tính toán'/>
    },
    {
      id: 4,
      image: '/images/slides/image4.avif',
      title: 'Bài viết mới nhất năm 2025',
      component: <Blog4 image='/images/slides/image4.avif' title='Bài viết mới nhất năm 2025'/>
    },
  ];

  const [Blog, setBlog] = useState(blogs[0].component);

  return (
    <div className={cx('tech-layout')}>
      {/* Bên trái - bài viết chính */}
      <div className={cx('main-article')}>
        {Blog}
      </div>

      {/* Bên phải - danh sách bài viết */}
      <div className={cx('side-articles')}>
        <h2>Bài viết liên quan</h2>
        <div className={cx('blogList')}>
          {blogs.map(blog => (
            <div key={blog.id} className={cx('blog')}>
              <img src={blog.image} alt={blog.title} />
              <div className={cx('context')}>
                <h3>{blog.title}</h3>
                <button onClick={() => setBlog(blog.component)}>Xem thêm</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
