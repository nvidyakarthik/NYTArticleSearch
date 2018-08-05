import React from "react";
import { FormBtn } from "../../components/Form";

export const ArticleContent = props => (

    <div className="card card-block bg-faded">
        <div className="col-xs-4">
            <a href={props.web_url} target="_blank">
                {props.headline}
            </a>
        </div>
        <div className="col-xs-4">
            <FormBtn
                saveFunc={props.saveFunc}
                title={props.headline}
                weburl={props.web_url}
            >{props.btnState}</FormBtn>
        </div>
        <div className="col-xs-4">Published Date : {props.pub_date}</div>

    </div>

);