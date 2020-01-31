import React from 'react';

import 'css/CoordinatesForm';

interface coordinateProps {
  degree: number;
  minutes: number;
  seconds: number;
  cardinalPoint: string;
}

interface DMSFormValues {
  coordinateValue: number;
  rowNum: number;
  coordinateType: string;
  degreeType: number;
  cardinalPoint: string;
}

interface DMSSectionProps {
  dmsSection: {
    rowNum: number;
    latitude: coordinateProps;
    longitude: coordinateProps;
  };
  setDMSFormValues: (formValues: DMSFormValues) => void;
  setDMSCardinalType: (cardinalValue: DMSFormValues) => void;
  degreeSymbol: string;
  minuteSymbol: string;
  secondsSymbol: string;
  key: number;
}

export default function DMSSection(props: DMSSectionProps): JSX.Element {
  const {
    dmsSection,
    setDMSFormValues,
    setDMSCardinalType,
    degreeSymbol,
    minuteSymbol,
    secondsSymbol
  } = props;
  const { rowNum, latitude, longitude } = dmsSection;

  return (
    <>
      <div className="dms-wrapper">
        <span>Latitude</span>
        <div className="input-wrapper">
          <input
            type="number"
            name="latitude coordinates"
            value={latitude.degree}
            onChange={(e): void =>
              setDMSFormValues({
                coordinateValue: Number(e.target.value),
                rowNum,
                coordinateType: 'latitude',
                degreeType: 'degree'
              })
            }
          />
          <span className="degree">{degreeSymbol}</span>
          <input
            type="number"
            name="latitude coordinates"
            value={latitude.minutes}
            onChange={(e): void =>
              setDMSFormValues({
                coordinateValue: Number(e.target.value),
                rowNum,
                coordinateType: 'latitude',
                degreeType: 'minutes'
              })
            }
          />
          <span className="degree">{minuteSymbol}</span>
          <input
            type="number"
            name="latitude coordinates"
            value={latitude.seconds}
            onChange={(e): void =>
              setDMSFormValues({
                coordinateValue: Number(e.target.value),
                rowNum,
                coordinateType: 'latitude',
                degreeType: 'seconds'
              })
            }
          />
          <span className="degree">{secondsSymbol}</span>
          <select
            value={latitude.cardinalPoint}
            onChange={(e): void =>
              setDMSCardinalType({
                specificPoint: e.target.value,
                rowNum,
                coordinateType: 'latitude'
              })
            }
          >
            <option value="N">N</option>
            <option value="S">S</option>
          </select>
        </div>
      </div>
      <div className="dms-wrapper">
        <span>Longitude</span>
        <div className="input-wrapper">
          <input
            type="number"
            name="longitude coordinates"
            value={longitude.degree}
            onChange={(e): void =>
              setDMSFormValues({
                coordinateValue: Number(e.target.value),
                rowNum,
                coordinateType: 'longitude',
                degreeType: 'degree'
              })
            }
          />
          <span className="degree">{degreeSymbol}</span>
          <input
            type="number"
            name="longitude coordinates"
            value={longitude.minutes}
            onChange={(e): void =>
              setDMSFormValues({
                coordinateValue: Number(e.target.value),
                rowNum,
                coordinateType: 'longitude',
                degreeType: 'minutes'
              })
            }
          />
          <span className="degree">{minuteSymbol}</span>
          <input
            type="number"
            name="longitude coordinates"
            value={longitude.seconds}
            onChange={(e): void =>
              setDMSFormValues({
                coordinateValue: Number(e.target.value),
                rowNum,
                coordinateType: 'longitude',
                degreeType: 'seconds'
              })
            }
          />
          <span className="degree">{secondsSymbol}</span>
          <select
            value={longitude.cardinalPoint}
            onChange={(e): void =>
              setDMSCardinalType({
                specificPoint: e.target.value,
                rowNum,
                coordinateType: 'longitude'
              })
            }
          >
            <option value="E">E</option>
            <option value="W">W</option>
          </select>
        </div>
      </div>
      <hr />
    </>
  );
}
