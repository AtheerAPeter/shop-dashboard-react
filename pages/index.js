import { Row, Col, Input, Button } from "antd";
import { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
//components
import Category from "../components/category";
import ImageUpload from "../components/imageUpload";
const Home = () => {
  const [fileList, setFileList] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState("");
  const [selected, setSelected] = useState([]);

  var ReactQuill;
  if (typeof window !== "undefined") {
    ReactQuill = require("react-quill");
  }

  const handleAddProduct = async () => {
    var formdata = new FormData();
    formdata.append(
      "image",
      fileList[0].originFileObj,
      fileList[0].originFileObj.name
    );
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://api.imgbb.com/1/upload?key=7bcfad647ce27bcb52f097ea42f14275",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data.display_url);

        let raw = JSON.stringify({
          name,
          price,
          image: result.data.display_url,
          category: selected,
          description: text,
        });
        fetch("https://fikracamps-shop-atheer.herokuapp.com/v1/upload", {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        })
          .then((response) => response.text())
          .then((result) => console.log(JSON.parse(result)))
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <div className="container">
        <Row gutter={[10, 20]}>
          <Col span={16}>
            <h1>Add a product</h1>
          </Col>
          <Col span={8}>
            <Button
              disabled={
                fileList.length > 0 && text && name && selected && price
                  ? false
                  : true
              }
              onClick={handleAddProduct}
              type="primary"
              icon={<PlusCircleOutlined />}
              style={{ width: "100%" }}
            >
              Add
            </Button>
          </Col>
        </Row>

        <Row gutter={[10, 20]}>
          <Col style={{ margin: "auto" }} span={24}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
            />
          </Col>
        </Row>

        <Row gutter={[10, 20]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              prefix="🇮🇶"
              suffix="IQD"
              type="number"
              placeholder="Price"
            />
          </Col>
          <Col style={{ margin: "auto" }} xs={24} sm={24} md={12} lg={12}>
            <Category
              style={{ width: "100%" }}
              category={category}
              setCategory={setCategory}
              selected={selected}
              setSelected={setSelected}
            />
          </Col>
        </Row>
        <Col span={24}>
          <ImageUpload setFileList={setFileList} fileList={fileList} />
        </Col>

        <Col span={24}>
          {ReactQuill && (
            <ReactQuill
              theme="snow"
              value={text}
              onChange={(value) => setText(value)}
              placeholder="Description"
            />
          )}
        </Col>
      </div>
    </>
  );
};

export default Home;
