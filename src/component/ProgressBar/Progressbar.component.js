//import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './Progressbar.style.scss';

class Progressbar extends PureComponent {
    renderElement(step) {
        const { title, marked, index } = step;
        const className = marked ? 'active' : '';

        return (
            <div className='step-container'>
                <div className={`circle ${className}`} key={ name }>
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
        console.log(stepList);


        return (
            <div class="progress-container">
                { stepList.map(step => {
                    return this.renderElement(step);
                }) }
            </div>
        );
    }

    render() {        
        return (
            <div className='progressbar-container'>
                <div class="progress" id="progress"></div>
                { this.renderList() }
            </div>
        );
    }
}

export default Progressbar;