import React, { useState, useEffect } from "react";

const categories = ['IT', 'Leadership'];
const types = ['Courses', 'Streams'];
const instructors = ['Oron Shvartz', 'Instructor1', 'Or Or'];

function Sidebar({query, handleQueryChange, selectedCategories, handleSelectCategoriesChange, selectedTypes, handleSelectTypesChange, selectedInstructors, handleSelectInstructorsChange, handleReset, handleSelectAllCategories}) {

    const [categoryQuery, setCategoryQuery] = useState('');
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [filteredTypes, setFilteredTypes] = useState(types);
    const [filteredInstructors, setFilteredInstructors] = useState(instructors);

    const [filterMenu, setFilterMenu] = React.useState(false);

    useEffect(() => {
        setFilteredCategories(
          categories.filter((category) => {
            return category.toLowerCase().includes(categoryQuery.toLowerCase());
          })
        );
        setFilteredTypes(
            types.filter((type) => {
              return type.toLowerCase();
            })
        );
        setFilteredInstructors(
            instructors.filter((instructor) => {
              return instructor.toLowerCase();
            })
        );
      }, [categoryQuery]);
    
      const handleCategoryQueryChange = (e) => {
        const {
          target: { value },
        } = e;
        setCategoryQuery(value);
      };
    
      const handleCategoryChange = (e) => {
        handleSelectCategoriesChange(e.target.name);
      }; 

      const handleTypesChange = (e) => {
        handleSelectTypesChange(e.target.name);
      }; 

      const handleInstructorsChange = (e) => {
        handleSelectInstructorsChange(e.target.name);
      }; 
      
     const handleAllCategoriesChange = () => {
        let isAllSelected = selectedCategories.length === categories.length ? true : false
        handleSelectAllCategories({isAllSelected, categories})
      };   
    return (
        <aside>
            <span onClick={() => setFilterMenu(!filterMenu)} className={`filter-icon ${filterMenu ? "active": ""}`}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28 56C43.464 56 56 43.464 56 28C56 12.5361 43.464 0 28 0C12.5361 0 0 12.5361 0 28C0 43.464 12.5361 56 28 56Z" fill="#912695"/>
                <path d="M40.5216 18H16.791C16.3542 18 16 18.3542 16 18.791V21.955C16 22.1634 16.0822 22.3632 16.2286 22.5112L25.4922 31.8778V44.2091C25.4922 44.5008 25.6528 44.7688 25.9099 44.9064C26.167 45.0439 26.4791 45.029 26.722 44.8673L31.468 41.7031C31.6881 41.5564 31.8203 41.3094 31.8203 41.045V31.8778L41.0839 22.5112C41.2303 22.3632 41.3125 22.1634 41.3125 21.955V18.791C41.3125 18.3542 40.9584 18 40.5216 18ZM30.2383 40.6217L27.0742 42.731V32.3438H30.2383V40.6217ZM30.6991 30.7617H26.6134L18.6859 22.7461H38.6266L30.6991 30.7617ZM39.7304 21.1641H17.582V19.582H39.7304V21.1641Z" fill="white"/>
            </svg>
            </span> 
            <div className={`main-filter-wrapper ${filterMenu ? "open": "close"}`}> 
                <span onClick={() => setFilterMenu(false)} className="close-filter">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.99998 7.11465L15.6 0.514648L17.4853 2.39998L10.8853 8.99998L17.4853 15.6L15.6 17.4853L8.99998 10.8853L2.39998 17.4853L0.514648 15.6L7.11465 8.99998L0.514648 2.39998L2.39998 0.514648L8.99998 7.11465Z" fill="#912695"/>
                    </svg>
                </span>
                <div className="search">
                    <input type="search" placeholder="Search" value={query} onChange={(e)=>handleQueryChange(e.target.value)}/>  
                </div>    
                <div className="filter-wrapper">
                    <div className="filter__heading flex border-grey"> 
                        <div className="filter-title">Filter By:</div>
                        <span className="reset" onClick={handleReset}>Reset</span>
                    </div> 
                    <div className="filter__content"> 
                        <div className="category border-grey">
                            <h3>Category</h3>
                            <input type="search" placeholder="Search Categories" value={categoryQuery} onChange={handleCategoryQueryChange}/>  
                            <div>
                                {!!filteredCategories.length && (
                                    <div><label className="flex"><input type="checkbox" checked={selectedCategories.length === categories.length} onChange={handleAllCategoriesChange}/>Select All</label></div>
                                )}
                                {filteredCategories.map((category) => (
                                    <div key={category}>
                                        <label className="flex">
                                            <input type="checkbox" name={category} checked={selectedCategories.includes(category)} onChange={handleCategoryChange} />
                                            {category}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="types border-grey">
                            <h3>Types</h3>
                            <div>
                                {filteredTypes.map((type) => (
                                    <div key={type}>
                                        <label className="flex">
                                            <input type="checkbox" name={type} checked={selectedTypes.includes(type)} onChange={handleTypesChange} />
                                            {type}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="instructors border-grey">
                            <h3>Instructors</h3>
                            <div>
                                {filteredInstructors.map((instructor) => (
                                    <div key={instructor}>
                                        <label className="flex">
                                            <input type="checkbox" name={instructor} checked={selectedInstructors.includes(instructor)} onChange={handleInstructorsChange} />
                                            {instructor}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>        
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;