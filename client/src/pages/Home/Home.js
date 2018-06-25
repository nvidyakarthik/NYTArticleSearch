import React, { Component } from "react";
import API from "../../utils/API";
import Card from "../../components/Card";
import moment from 'moment';
import DeleteBtn from "../../components/DeleteBtn"
import { Input, Label, FormBtn } from "../../components/Form";
import "./Home.css";
 
class Home extends Component {

    state = {
        topic: "",
        startyear: "",
        endyear: "",
        articles: [],
        savedArticles:[],
        buttonName:"Save"

    };
    componentDidMount() {

       this.loadSavedArticles();
      } 
    loadSavedArticles = () => {
        API.getSavedArticles()
            .then(res => this.setState({ savedArticles: res.data})
            )
            .catch(err => console.log(err));
    };
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSaveArticle=(title,weburl)=>{
        API.saveArticle({
            title:title,            
            url:weburl})
        .then(res =>this.loadSavedArticles()
        )
        .catch(err => console.log(err));
    }

    deleteArticle = id => {
        API.deleteArticle(id)
          .then(res => this.loadSavedArticles())
          .catch(err => console.log(err));
      };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.topic && this.state.startyear && this.state.endyear) {
            API.getArticles(this.state.topic, this.state.startyear, this.state.endyear
            )
                .then(res => this.setState({ articles: res.data.docs }))
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <div className="container">
            <Card title="Search Parameters">
                <form>
                    <div className="form-group">
                        <label for="formGroupExampleInput">Topic:</label>
                        <input type="text" className="form-control" value={this.state.topic}
                            onChange={this.handleInputChange}
                            name="topic" />
                    </div>

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
                    <button type="button" className="btn btn-secondary" id="search" onClick={this.handleFormSubmit}><i className="fas fa-search"></i> Search</button>
                    <button type="button" className="btn btn-secondary" id="clear">Clear Results</button>
                </form>

            </Card>
            <Card title="Results">
                {!this.state.articles.length ? (
                            <h1 className="text-center">No Articles found to Display.</h1>
                        ) : (
                                <div>
                                    {this.state.articles.map(article => {
                                        return (
                                        <div className="well">
                                            <a href={article.web_url} target="_blank">
                                                {article.headline.main}
                                            </a>
                                            <FormBtn 
                                               saveFunc={this.handleSaveArticle}
                                               title={article.headline.main}
                                               weburl={article.web_url}
                                            >Save</FormBtn>

                                        </div>
                                        );
                                    })}
                                </div>

                            )
                        }
            </Card>
             <Card title="Saved Articles">
            {!this.state.savedArticles.length ? (
                            <h1 className="text-center">You don't have any Saved Articles.</h1>
                        ) : (
                                <div>
                                    {this.state.savedArticles.map(article => {
                                        return (
                                        <div className="card card-block bg-faded">
                                            <div className="col-xs-4">
                                            <a href={article.url} target="_blank">
                                                {article.title}
                                            </a></div>
                                            <div className="col-xs-4">Date Saved: {moment(article.date).format('YYYY/MM/DD')}</div>
                                            <div className="col-xs-4">
                                            <DeleteBtn
                                               onClick={()=>this.deleteArticle(article._id)}  
                                               key={article._id}
                                               title={article.title}
                                               weburl={article.url}
                                               date={article.date}>Delete</DeleteBtn></div>

                                        </div>
                                        );
                                    })}
                                </div>

                            )
                        }
            </Card>
           </div>
            

        );
    }


}
export default Home;