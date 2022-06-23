//import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './Progressbar.style.scss';

class Progressbar extends PureComponent {
    renderElement(step) {
        const { title, marked, index, id, isCurrentStep } = step;
        const className = marked || isCurrentStep ? 'active' : '';

        return (
            <div className='step-container'>
                <div className={`circle ${className}`} key={ id }>
                    { marked ? <span> &#10003; </span> : <span>{ index }</span> }
                </div>
                <div className='progress-title'> 
                    { title }
                </div>
            </div>
        );
    }

    renderList() {
        const stepList = Object.keys(this.props.stepList).map(key => this.props.stepList[key]);

        return (
            <div class="progress-container">
                { stepList.map(step => {
                    return this.renderElement(step);
                }) }
            </div>
        );
    }

    calculateWidth = () => {
        const { stepList } = this.props;
        const listLength = Object.keys(stepList).length;
        let markedSteps = 0;
        let currentStepIndex = 0;

        for (const key in stepList) {
            const step = stepList[key];
            markedSteps = markedSteps + (step.marked ? 1 : 0);
            currentStepIndex = step.isCurrentStep ? step.index - 1 : 0;
        }

        currentStepIndex = listLength === markedSteps ? listLength - 1 : currentStepIndex;
 
        const widthStep = listLength - 1 !== 0 ? 50 / (listLength - 1) : 0;
        const length = 25 + widthStep * currentStepIndex + (markedSteps === listLength ? 25 : 0);
        const correction = currentStepIndex === 0 ? 15 : (currentStepIndex === listLength - 1 && markedSteps !== listLength ? - 15 : 0);
        console.log('length', length);
        console.log('correction', correction);
        return `calc(${length}% + ${correction}px)`;
    }

    render() {
        const progressLineStyle = {
            width: this.calculateWidth()
        };

        return (
            <div className='progressbar-container'>
                <div class="progress" style={progressLineStyle}></div>
                { this.renderList() }
            </div>
        );
    }
}

export default Progressbar;