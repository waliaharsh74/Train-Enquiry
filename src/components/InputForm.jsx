import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './InputForm.css';

function InputForm() {
    const location = useLocation();
    const { source, destination, dd, mm, yyyy } = location.state;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const url = `https://api.railyatri.in/api/trains-between-station-from-wrapper.json?from=${source.code}&to=${destination.code}&dateOfJourney=${dd}-${mm}-${yyyy}%20&action=train_between_station&controller=train_ticket_tbs&device_type_id=6&from_code=${source.code}&from_name=${source.name}&journey_date=${dd}-${mm}-${yyyy}&journey_quota=GN&to_code=${destination.code}&to_name=${destination.name}&authentication_token=&v_code=null&user_id=-1716516178&`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const result = await response.json();
                setData([...result.train_between_stations]);
            } catch (error) {
                console.error(error.message || "something went wrong");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [source.code, destination.code, dd, mm, yyyy]);

    if (loading) {
        return (
            <h1 className="Loading">
                Loading.....
            </h1>
        );
    }

    return (
        <div className="container">

            {data.length === 0 ? (
                <div className="no-trains">
                    <h1>Sorry! No trains available:(</h1>

                    <Link to='/' className='go-home' >Go Home</Link>


                </div>
            ) : (
                <div>
                    <h1 className="title">Trains from {source.name} To {destination.name}</h1>
                    {data.map((train) => (
                        <div key={train?.train_number} className="train-card">
                            <div className="train-info">
                                {train?.train_number} - {train.train_name}
                            </div>
                            <div className="additional-info">
                                <div>Duration: {train.duration} hrs</div>
                                <div>Distance: {train.distance} km</div>
                                <div>Departure Time: {train.from_std}</div>
                                <div>Arrival Time: {train.to_sta}</div>
                            </div>
                            <div className="run-days">
                                Run Days: {train.run_days ? train.run_days.join(', ') : 'N/A'}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default InputForm;
