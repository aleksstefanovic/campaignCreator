import React, { Component } from 'react';
import AppendixA from '../config/appendixA.json';
import objectiveTypes from '../config/objectiveTypes.json';

class Steps extends Component {
  constructor (props) {
    super (props);

    this.state = {
      "step":1,
      "newCampaign": {},
      "objectiveTypes":objectiveTypes
    }
  }

  render() {
    if (this.state.step === 1) {
        return (<p className="App-intro">
                    Select a template
                    <br/>
                    {AppendixA.map((template) => (
                        <button onClick={this.step1Submit.bind(this, template)}>{template.templateName}</button> 
                    ))}
                </p>);
    }
    else if (this.state.step === 2) {
        return (<p className="App-intro">
                    Modify values
                    <br/>
                    {this.state.newCampaign.adTitle.map((title, index) => (
                       <div>
                           <label>Title {index+1}</label>
                           <input type="text" ref={'title'+index} value={title} onChange={e => this.titleChange(e.target.value, index)}/> 
                       </div>
                    ))}
                    <br/>
                    {this.state.newCampaign.adCopy.map((copy, index) => (
                       <div>
                           <label>Copy {index+1}</label>
                           <input type="text" ref={'copy'+index} value={copy} onChange={e => this.copyChange(e.target.value, index)}   /> 
                       </div>
                    ))}
                    <br/>
                    {this.state.newCampaign.image.map((link, index) => (
                       <div>
                           <label>Image {index+1}</label>
                           <input type="text" ref={'image'+index} value={link} onChange={e => this.imageChange(e.target.value, index)} /> 
                       </div>
                    ))}
                    <br/>
                    <div>
                        <label>Objective</label>
                        <select value={this.state.newCampaign.campaignObjective} onChange={e => this.objectiveChange(e.target.value)}>
                            {this.state.objectiveTypes.map((objective) => (
                               <option value={objective.type}>{objective.name}</option>
                            ))}
                        </select>
                    </div>
                    <br/>
                    <button onClick={this.step2Submit.bind(this)}>Save</button> 
                </p>);
    }
    else if (this.state.step === 3) {
        return (<p className="App-intro">
                    Publish when ready
                    <br/>
                    {this.state.newCampaign.adTitle.map((title, index) => (
                       <div>
                           <p>Title {index+1}: {title}</p> 
                       </div>
                    ))}
                    <br/>
                    {this.state.newCampaign.adCopy.map((copy, index) => (
                       <div>
                           <p>Copy {index+1}: {copy}</p> 
                       </div>
                    ))}
                    <br/>
                    {this.state.newCampaign.image.map((link, index) => (
                       <div>
                           <p>Image {index+1}: {link}</p> 
                       </div>
                    ))}
                    <br/>
                    <div>
                        <p>Objective: {this.getObjectiveDisplayName(this.state.newCampaign.campaignObjective)}</p> 
                    </div>
                    <br/>
                    <div>
                        <label>Please select an Ad Network to publish to:</label>
                        <select value={this.state.newCampaign.adNetWorkId} onChange={e => this.adNetworkChange(e.target.value)}>
                               <option value="FACEBOOK">Facebook</option>
                               <option value="GOOGLE">Google</option>
                               <option value="OTHER">Other</option>
                        </select>
                    </div>
                    <button onClick={this.step3Submit.bind(this)}>Publish</button> 
                </p>);
    }
    else if (this.state.step === 4) {
        return (<p className="App-intro">
                    Successfully published!
                    <br/>
                </p>);
    }
  }

  step1Submit (template) {
    var newCampaign = this.state.newCampaign;
    
    //set default of the new campaign to be the values in the template, then move to step 2 (optional task) where the user can modify these values
    newCampaign.template = template.templateName;
    newCampaign.adTitle = template.title;
    newCampaign.adCopy = template.adCopy;
    newCampaign.image = [];
    for (var i = 0; i < template.imageCount; i++) {
        newCampaign.image.push ("");
    }
    newCampaign.campaignObjective = template.campaignObjective;
    newCampaign.status = "NOT_STARTED";
    newCampaign.adNetworkId = null;

    this.setState ({
        "step":2,
        "newCampaign":newCampaign
    });
  }

  step2Submit () {
    this.setState ({
        "step":3
    });
  }

  step3Submit () {
    var newCampaign = this.state.newCampaign;
    newCampaign.status = "IMPLEMENTED";

    this.setState ({
        "step":4,
        "newCampaign":newCampaign
    });
  }

  titleChange (title, index) {
    var newCampaign = this.state.newCampaign;
    newCampaign.adTitle[index] = title;

    this.setState ({
        "newCampaign":newCampaign
    });
  }

  copyChange (copy, index) {
    var newCampaign = this.state.newCampaign;
    newCampaign.adCopy[index] = copy;

    this.setState ({
        "newCampaign":newCampaign
    });
  }

  imageChange (image, index) {
    var newCampaign = this.state.newCampaign;
    newCampaign.image[index] = image;

    this.setState ({
        "newCampaign":newCampaign
    });
  }

  objectiveChange (objective) {
    var newCampaign = this.state.newCampaign;
    newCampaign.campaignObjective = objective;

    this.setState ({
        "newCampaign":newCampaign
    });
  }

  adNetworkChange (adNetworkId) {
    var newCampaign = this.state.newCampaign;
    newCampaign.adNetworkId = adNetworkId;

    this.setState ({
        "newCampaign":newCampaign
    });
  }
  
  getObjectiveDisplayName (objectiveType) {
    for (var i = 0; i < this.state.objectiveTypes.length; i++) {
        if (this.state.objectiveTypes[i].type === objectiveType) {
            return this.state.objectiveTypes[i].name;
        }
    }
    return null;
  }
}

export default Steps;
