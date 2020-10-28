import { Select } from "antd";
const { Option } = Select;
import { useEffect } from "react";

const Category = ({ category, setCategory, selected, setSelected }) => {
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://fikracamps-shop-atheer.herokuapp.com/v1/categories",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCategory(result.data.categories[0]);
      })
      .catch((error) => console.log("error", error));
  }, []);
  function onChange(value) {
    setSelected(category.filter((e) => e.id == value));
  }

  function onBlur() {
    // console.log("blur");
  }

  function onFocus() {
    // console.log("focus");
  }

  function onSearch(val) {
    // console.log("search:", val);
  }
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select category"
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {category.map((item) => {
        return (
          <Option key={item.id} value={item.id}>
            {item.title}
          </Option>
        );
      })}
    </Select>
  );
};

export default Category;
