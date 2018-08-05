import React, { Component } from "react";
import API from "../../utils/API";
import { Input, Label, FormBtn } from "../../components/Form";

class Search extends Component {

    state = {
        topic: "",
        startyear: "",
        endyear: "",
        title:"",
        url:"",
        articles:[]

    };
    loadArticles = () => {
        API.getBooks()
          .then(res =>
            this.setState({ title: res.data.title, url:res.data.url})
          )
          .catch(err => console.log(err));
      };
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.topic && this.state.startyear && this.state.endyear) {
          API.getArticles(this.state.topic,this.state.startyear,this.state.endyear
          )
            .then(res => this.setState({articles:res.response.docs}))
            .catch(err => console.log(err));
        }
      };  

    render() {
        return (

 <div className="container">
            <div className="card">
                <div className="card-header">
                    <i className="fas fa-table"></i> Search Parameters
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label for="formGroupExampleInput">Topic:</label>
                            <input type="text" className="form-control" value={this.state.topic}
                                onChange={this.handleInputChange}
                                name="topic" />
                        </div>
                        <form className="form-group">
                            <label className="my-1 mr-2" for="inlineFormCustomSelectPref">Number of Records to Retrieve:</label>
                            <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                                <option selected>Choose...</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </form>
                        <div className="form-group">
                            <label for="formGroupExampleInput2">Start Year (optional):</label>
                            <input type="text" className="form-control" value={this.state.startyear}
                                onChange={this.handleInputChange}
                                name="startyear"
                                placeholder="Start Year (required)" />
                        </div>
                        <div className="form-group">
                            <label for="formGroupExampleInput2">End Year (optional):</label>
                            <input type="text" className="form-control" value={this.state.endyear}
                                onChange={this.handleInputChange}
                                name="endyear"
                                placeholder="End Year (required)" />
                        </div>
                        <button type="button" className="btn btn-secondary" id="search"  onClick={this.handleFormSubmit}><i className="fas fa-search"></i> Search</button>
                        <button type="button" className="btn btn-secondary" id="clear">Clear Results</button>
                    </form>
                </div>
            </div>
            <div className="card">
            <div className="card-header">
                <i className="fas fa-table"></i> Results
            </div>
            <div className="card-body">
           
             {!this.state.articles ? (
                <h1 className="text-center">No Articles to Display</h1>
              ) : (
                  <div className="card">
                  {this.state.articles.map(article => {
                   <div>{article.headline.main}></div>
                  })}
                  </div>
                  
              )
            }   
            </div>
            </div>
        </div>




        );
    }


}
export default Search;