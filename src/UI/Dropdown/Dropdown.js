import { Dropdown, Anchor } from "atomize";
import React, { useState } from "react";

let BasicDropdown = (props) => {
  const menuList = (
    <div >
      {props.location.map((name, index) => (
        <Anchor
          onClick={() => {
            setShowDropdown(!showDropdown);
            props.setName(name)
            setValue(name);
          }}
          
         
          key={index}
          d="block"
          p={{ y: "0.25rem" }}
        >
          {name}
        </Anchor>
      ))}
    </div>
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [value, setValue] = useState();
  return (
    <Dropdown

      isOpen={showDropdown}
      onClick={() => setShowDropdown(!showDropdown)}
      menu={menuList}
    >
      {value ? value : props.location ? "Locations" : "Settings"}
    </Dropdown>
  );
};

export default BasicDropdown;
