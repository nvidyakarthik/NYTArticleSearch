import React, { Component } from "react";
import API from "../../utils/API";
import Card from "../../components/Card";
import { ArticleContent } from "../../components/Form";
import "./Home.css";
import moment from 'moment';

class Home extends Component {

    state = {
        topic: "",
        startyear: "",
        endyear: "",
        articles: [],
        isSaved:"Save"

    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSaveArticle = (title, weburl) => {

        API.saveArticle({
            title: title,
            url: weburl
        })
            .then(res => {
                console.log("Article Saved");                
                let filteredArticles = this.state.articles.map(function (element) {
                    if(element.web_url === weburl){
                        element.isSaved="Saved!!";                        
                    }
                    return element;
                });
                this.setState({ articles: filteredArticles });

            })
            .catch(err => console.log(err));
    }
    clearResults = () => {
        this.setState({ articles: [] });
    }

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.topic && this.state.startyear && this.state.endyear) {
            API.getArticles(this.state.topic, this.state.startyear, this.state.endyear
            )
                .then(res =>{
                    const articleData=res.data.docs; 
                    articleData.map((obj) => {
                        obj.isSaved = 'Save';
                        return obj;
                    })                  
                    
                     this.setState({ 
                    articles: articleData                    
                })
            }).catch(err => console.log(err));
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
                                {this.state.articles.map((article, i) => {
                                    return (
                                        <ArticleContent
                                            key={i}
                                            web_url={article.web_url}
                                            headline={article.headline.main}
                                            saveFunc={this.handleSaveArticle}
                                            pub_date={moment(article.pub_date).format('MMMM Do YYYY')}
                                            btnState={article.isSaved}
                                        />

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