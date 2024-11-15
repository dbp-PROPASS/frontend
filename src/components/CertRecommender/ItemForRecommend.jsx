import React from 'react';
import '../../styles/CertRecommender/ItemForRecommend.css'

const ItemForRecommend = ({ title, certifications }) => {
  return (
    <div className='itemForRecommend'>
      <h2 className='itemRecoTitle'>{title}</h2>
      <ul className='itemRecoList'>
        {certifications.map((certification, index) => (
          <li key={index} className='itemRecoItem'>{index+1}. {certification}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemForRecommend;