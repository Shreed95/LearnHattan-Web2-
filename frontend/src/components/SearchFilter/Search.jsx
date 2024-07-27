import WalletButton from '../WalletButton'
import { useState } from 'react';
import styles from './Search.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { signData } from '../EnrollContract'
// import { useAccount, useSignMessage } from 'wagmi';

function Search({ coursesData, selectedTags, setSelectedTags }) {
  const [name, setName] = useState('');
  const [visibleCourses, setVisibleCourses] = useState(6);
  const [seeMoreDisabled, setSeeMoreDisabled] = useState(false);
  const [seeLessDisabled, setSeeLessDisabled] = useState(true);
  const [showExtendedCourses, setShowExtendedCourses] = useState(false);
  // const { address, isConnected } = useAccount();


  const [foundCourses, setFoundCourses] = useState(coursesData);
  const [showTagsBox, setShowTagsBox] = useState(false);
  const tags = [
    'sol', 'web3', 'marketing', 'ai', 'blockchain', 'startup', 'no', 'Smart Contracts',
    'Decentralized Finance (DeFi)',
    'Cryptocurrency',
    'Ethereum',
    'Hyperledger',
    'DApp Development',
    'Blockchain Security',
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing (NLP)',
    'Computer Vision',
    'Neural Networks',
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'JavaScript Frameworks',
    'Node.js',
    'Web Security',


  ];

  const filter = (e) => {
    const keyword = e.target.value.toLowerCase();

    const results = coursesData.filter((course) => {
      const hasKeyword = course.title.toLowerCase().includes(keyword) ||
        course.tags.some((tag) => tag.toLowerCase().includes(keyword));

      const hasSelectedTags = selectedTags.length === 0 || selectedTags.every((tag) => course.tags.includes(tag));

      return hasKeyword && hasSelectedTags;
    });

    setFoundCourses(results);
    setName(keyword);
  };

  const handleTagClick = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);
    if (newSelectedTags.length === 0) {
      setFoundCourses(coursesData);
    }
  };

  const toggleTagsBox = () => {
    setShowTagsBox(!showTagsBox);
  };

  const renderTags = () => {
    return tags.map((tag) => (
      <span
        key={tag}
        className={`${styles.tag} ${selectedTags.includes(tag) ? styles.selectedTag : ''}`}
        onClick={() => handleTagClick(tag)}
      >
        {tag}
      </span>
    ));
  };

  const applyFilter = () => {
    const results = coursesData.filter((course) => selectedTags.every((tag) => course.tags.includes(tag)));
    setFoundCourses(results);
  };

  const clearAllTags = () => {
    setSelectedTags([]);
    setFoundCourses(coursesData); // Reset foundCourses to show all courses
  };

  const showMoreCourses = () => {
    setVisibleCourses(coursesData.length); //  all courses
    setSeeMoreDisabled(true);
    setSeeLessDisabled(false);
    setShowExtendedCourses(true);
  };

  const showLessCourses = () => {
    setVisibleCourses(6); // initial 6 courses
    setSeeMoreDisabled(false);
    setSeeLessDisabled(true);
    setShowExtendedCourses(false);
  };

  return (
    <div className={styles.container}>
      <input
        type="search"
        value={name}
        onChange={filter}
        className={styles.input}
        placeholder="Search"
      />

      <button
        type="button"
        onClick={toggleTagsBox}
        className={`${styles.filter} ${styles.filterButton}`}
      >
        Filter
      </button>

      <div className={styles.tagsContainer}>
        {showTagsBox && (
          <div className={styles.tagsBox}>
            {renderTags()}
          </div>
        )}

        {selectedTags.length > 0 && (
          <div className={styles.selectedTagsContainer}>
            {selectedTags.map((tag) => (
              <span key={tag} className={styles.selectedTag} onClick={() => handleTagClick(tag)}>
                {tag}
              </span>
            ))}
            <button type="button" onClick={applyFilter} className={styles.applyFilterButton}>
              Apply Filter
            </button>
            <button type="button" onClick={clearAllTags} className={styles.clearAllButton}>
              Clear All
            </button>
          </div>
        )}
      </div>

      <div className={styles.courseList}>
        {foundCourses && foundCourses.length > 0 ? (
          foundCourses.map((course) => (
            <div key={course.id} className={styles.courseItem}>
              <Link to="/CourseDetail">
                <div className={styles.thumbnail}>
                  <img src={course.image} alt={course.title} />
                </div>
                <h2>{course.title}</h2>
              </Link>
              <div className="teacher-profile">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, saepe?</p>
              </div>
              <div className={styles.Enrollbtn}>
                {/* {isConnected ? */}
                (<button onClick={signData}>Enroll</button>) :
                (<WalletButton buttonName="Enroll" showWalletAddress={false} />)
                {/* } */}
              </div>
            </div>
          ))
        ) : (
          <h1 className={styles.notFound}>No results found!</h1>
        )}
      </div>

      <div className="button-container">
        {!showExtendedCourses && (
          <button onClick={showMoreCourses} className="see-more-button" disabled={seeMoreDisabled}>
            See More
          </button>
        )}
        {showExtendedCourses && (
          <button onClick={showLessCourses} className="see-less-button" disabled={seeLessDisabled}>
            See Less
          </button>
        )}
      </div>
      <div className="button-container">
        {!showExtendedCourses && (
          <button onClick={showMoreCourses} className="see-more-button" disabled={seeMoreDisabled}>
            See More
          </button>
        )}
        {showExtendedCourses && (
          <button onClick={showLessCourses} className="see-less-button" disabled={seeLessDisabled}>
            See Less
          </button>
        )}
      </div>

    </div>
  );
}

export default Search;
