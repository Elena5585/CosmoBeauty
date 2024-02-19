import React from 'react';
import { styles } from '../../styles/styles.js';
import './features.scss';

import "../../assets/icons/natural.svg";
import "../../assets/icons/features_divider.svg";
import "../../assets/icons/quality.svg";
import "../../assets/icons/organic.svg";


export default function FeaturesComponent() {
  return (
      <div className="new__features">
        <div className="new__features-card">
          <div className="new__card-image">
            <img src="./assets/icons/natural.svg" alt="" className="new__image-img"/>
            <img src="./assets/icons/features_divider.svg" alt="" className="new__image-decorator"/>
          </div>
          <h5 className="new__card-title" style={styles.titleStyle}>Natural</h5>
          <p className="new__card-text" style={styles.headerText}>
            An ingredient or formula composed of plant, mineral, and/or marine vegetation that undergoes chemical changes due to biological processes such as fermentation, distillation, and cold processing.
          </p>
        </div>
        <div className="new__features-card">
          <div className="new__card-image">
            <img  src="./assets/icons/quality.svg"  alt=""  className="new__image-img" />
            <img src="./assets/icons/features_divider.svg" alt="" className="new__image-decorator"/>
          </div>
          <h5 className="new__card-title" style={styles.titleStyle}>
            Quality
          </h5>
          <p className="new__card-text" style={styles.headerText}>
            All products formulations adhere to strict purity standards and will never contain harsh or toxic ingredients.
          </p>
        </div>
        <div className="new__features-card">
          <div className="new__card-image">
            <img src="./assets/icons/organic.svg" alt=""  className="new__image-img"  />
            <img src="./assets/icons/features_divider.svg" alt=""  className="new__image-decorator" />
          </div>
          <h5 className="new__card-title" style={styles.titleStyle}>Organic</h5>
          <p className="new__card-text" style={styles.headerText}>
            All products pigments are from fruit, vegetables, tea, and cocoa to avoid commonly used FD&C colorants and heavy metal dyes.
          </p>
        </div>
      </div>
  )
}
