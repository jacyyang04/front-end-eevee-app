//holder
import SearchBar.css 
import {useState} from react 
import react from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  return(
    <div className="Search">
      <input 
      type ="text 
      placeholder="🔍 Search..." 
      onChange={(event) => {
        setSearchTerm(event.target.value);
      }}
      />
      //{GEOCODING.map((val, key) => {
         return(
          <div className="user" key={key}> 
            //<p> {val.cityofsomekind} </p>
          </div>
         );
      })}
    </div>
  );
}

export default SearchBar;