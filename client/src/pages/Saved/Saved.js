import React, { Component } from "react";
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn";
import Card from "../../components/Card";
import moment from 'moment';


class Saved extends Component {
    state={
        savedArticles:[]
    }
    componentDidMount() {

        this.loadSavedArticles();
    }
    loadSavedArticles = () => {
        API.getSavedArticles()
            .then(res => this.setState({ savedArticles: res.data})
            )
            .catch(err => console.log(err));
    };
    
    deleteArticle = id => {
        API.deleteArticle(id)
          .then(res => this.loadSavedArticles())
          .catch(err => console.log(err));
    };

    render() {
        return(
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
                                            onClick={() => this.deleteArticle(article._id)}
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
        );

    }
}
export default Saved;