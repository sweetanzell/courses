import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Content from './components/Content/Content';
import axios from "axios";


function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [categories, setCategories] = useState(['IT', 'Leadership'])

  const fetchData = async () => {
    try {
      const { data: response } = await axios.get('https://62846288a48bd3c40b6e8c8d.mockapi.io/courses',
        {
          params: {
            ...(query && { title: query }),
            ...(selectedCategories.length && selectedCategories.length !== categories.length && {
              category: selectedCategories.join(','),
            }),
            ...(selectedTypes.length && {
              type: selectedTypes.join(','),
            }),
            ...(selectedInstructors.length && {
              instructor: selectedInstructors.join(','),
            }),
          },
        });
      setData(response);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  const handleQueryChange = (value) => {
    setQuery(value);
  };

  const handleSelectCategoriesChange = (value) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const handleSelectAllCategories = (selectAllObject) => {

    if (selectAllObject.isAllSelected) {
      setSelectedCategories([])
    } else {
      setSelectedCategories([...selectAllObject.categories])
    }

  }

  const handleSelectTypesChange = (value) => {
    if (selectedTypes.includes(value)) {
      setSelectedTypes(
        selectedTypes.filter((type) => type !== value)
      );
    } else {
      setSelectedTypes([...selectedTypes, value]);
    }
  };

  const handleSelectInstructorsChange = (value) => {
    if (selectedInstructors.includes(value)) {
      setSelectedInstructors(
        selectedInstructors.filter((instructor) => instructor !== value)
      );
    } else {
      setSelectedInstructors([...selectedInstructors, value]);
    }
  };

  const handleReset = () => {
    setQuery('')
    setSelectedCategories([])
    setSelectedInstructors([])
    setSelectedTypes([])
  }

  useEffect(() => {
    fetchData();
  }, [query, selectedCategories, selectedTypes, selectedInstructors]);


  return (
    <div className="App">
      <Header />
      <main className="flex main-container">
        {loading ? (
          <div className="lds-dual-ring"></div>
        ) : (
          <>
            <Sidebar
              query={query} handleQueryChange={handleQueryChange}
              selectedCategories={selectedCategories} handleSelectCategoriesChange={handleSelectCategoriesChange}
              selectedTypes={selectedTypes} handleSelectTypesChange={handleSelectTypesChange}
              selectedInstructors={selectedInstructors} handleSelectInstructorsChange={handleSelectInstructorsChange}
              handleReset={handleReset}
              handleSelectAllCategories={handleSelectAllCategories} />
            <Content data={data} />
          </>
        )}
      </main>

    </div>
  );
}

export default App;