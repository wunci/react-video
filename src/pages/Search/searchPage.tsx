import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./searchPage.less";
import { baseUrl, search } from "../../fetch/fetch";
import { IVideo } from "../type";
interface ISearchState {
  searchResult: Array<IVideo>;
}
class Search extends Component<Object | string, ISearchState> {
  constructor(props: Object | string) {
    super(props);
    this.doSearch = this.doSearch.bind(this);
    this.state = {
      searchResult: []
    };
  }
  doSearch(e: React.ChangeEvent<HTMLInputElement>) {
    search(e.target.value).then(res => {
      this.setState({
        searchResult: res.data
      });
    });
  }
  render() {
    let { searchResult } = this.state;
    return (
      <div>
        <section id="search_main">
          <div id="search">
            <input type="text" autoFocus={true} onChange={this.doSearch} />
            <i className="iconfont icon-sousuo1"></i>
            <Link to="/">
              <span>取消</span>
            </Link>
          </div>
          <div className="search_title">搜索结果</div>
          {searchResult && searchResult.length > 0 ? (
            <ul>
              {searchResult.map(val => (
                <li key={val.id}>
                  <Link to={"/video/" + val.id}>
                    <img src={baseUrl + "/images/" + val.img} alt="" />
                    <div className="result_name">
                      <p>{val.name}</p>
                      <p>
                        {val.star}分/{val.time1}{" "}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : searchResult !== null ? (
            <div className="not_find"> 没有相关影片 </div>
          ) : (
            <div></div>
          )}
        </section>
      </div>
    );
  }
}
export default Search;
