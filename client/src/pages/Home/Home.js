import React, { Component } from "react";
import API from "../../utils/API";
import Card from "../../components/Card";
import {FormBtn } from "../../components/Form";
import "./Home.css";
import moment from 'moment';
 
class Home extends Component {

    state = {
        topic: "",
        startyear: "",
        endyear: "",
        articles: [],
        
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
        .then(res =>{
            console.log("Article Saved");
            let filteredArticles=this.state.articles.filter(function(element){
                return element.web_url!==weburl;

            });
            this.setState({articles:filteredArticles});

        })
        .catch(err => console.log(err));
    }
    clearResults=()=>{
        this.setState({articles:[]});
    }

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
                        <label>Topic:</label>
                        <input type="text" className="form-control" value={this.state.topic}
                            onChange={this.handleInputChange}
                            name="topic" />
                    </div>

                    <div className="form-group">
                        <label>Start Year :</label>
                        <input type="text" className="form-control" value={this.state.startyear}
                            onChange={this.handleInputChange}
                            name="startyear"
                            placeholder="YYYY" />
                    </div>
                    <div className="form-group">
                        <label>End Year :</label>
                        <input type="text" className="form-control" value={this.state.endyear}
                            onChange={this.handleInputChange}
                            name="endyear"
                            placeholder="YYYY" />
                    </div>
                    <button type="button" className="btn btn-success" id="search" onClick={this.handleFormSubmit}><i className="fas fa-search"></i> Search</button>
                    <button type="button" className="btn btn-success" id="clear" onClick={this.clearResults}>Clear Results</button>
                </form>

            </Card>
            <Card title="Results">
                {!this.state.articles.length ? (
                            <h1 className="text-center">No Articles found to Display.</h1>
                        ) : (
                                <div>
                                    {this.state.articles.map((article,i) => {
                                        return (
                                        <div className="card card-block bg-faded" key={i}>
                                          <div className="col-xs-4">
                                            <a href={article.web_url} target="_blank">
                                                {article.headline.main}
                                            </a>
                                            </div>
                                            <div className="col-xs-4">
                                            <FormBtn 
                                               saveFunc={this.handleSaveArticle}
                                               title={article.headline.main}
                                               weburl={article.web_url}
                                               >Save</FormBtn>
                                            </div>   
                                            <div className="col-xs-4">Published Date : {moment(article.pub_date).format('MMMM Do YYYY')}</div>

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