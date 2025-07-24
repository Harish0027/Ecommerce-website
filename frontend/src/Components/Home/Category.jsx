import React from 'react'
import { categoryData } from '../../../data/Category'
import "./Category.css";

const Category = () => { 
    
  return (
    <div className='category-box'>
        {
            categoryData.map((category,index)=>(
                <div className='category-main' key={index}>
                    <img src={`${category.src}`} className='category-img' />
                    <p className='category-title'>{category.title}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Category