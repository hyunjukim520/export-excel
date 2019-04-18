import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ExportToExcel from "./ExportToExcel";
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    axios
      .get(url)
      .then(res => {
        this.setState({
          posts: res.data
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          posts: []
        });
      });
  }

  handleDeleteRow = id => {
    console.log("id", id);
    const index = this.state.posts.findIndex(post => post.id === id);
    console.log("index", index);
  };
  render() {
    const columns = [
      {
        Header: "User ID",
        accessor: "userId",
        style: {
          textAlign: "right"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "ID",
        accessor: "id",
        style: {
          textAlign: "right"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Title",
        accessor: "title",
        sortable: false,
        filterable: false
      },
      {
        Header: "Content",
        accessor: "body",
        sortable: false,
        filterable: false
      },
      {
        Header: "Actions",
        Cell: props => {
          return (
            <button
              style={{ backgroundColor: "red", color: "#fefefe" }}
              onClick={() => {
                // console.log("props", props);
                this.handleDeleteRow(props.original.id);
              }}
            >
              Delete
            </button>
          );
        },
        sortable: false,
        filterable: false,
        width: 100,
        maxWidth: 100,
        minWidth: 100
      }
    ];
    return (
      <ReactTable
        columns={columns}
        data={this.state.posts}
        filterable
        defaultPageSize={10}
        noDataText={"Please wait..."}
      >
        {(state, filteredData, instance) => {
          this.reactTable = state.pageRows.map(post => {
            return post._original;
          });
          return (
            <div>
              {filteredData()}
              <ExportToExcel posts={this.reactTable} />
            </div>
          );
        }}
      </ReactTable>
    );
  }
}

export default App;
