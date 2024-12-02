import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddVehicle = () => {
  const [Servicenumber, setServicenumber] = useState('');
  const [Vehiclenumber, setVehiclenumber] = useState('');
  const [Vehicletype, setVehicletype] = useState('');
  const [Servicegivendate, setServicegivendate] = useState('');
  const [Estmtdtime, setEstmtdtime] = useState('');
  const [Vehicleowner, setVehicleowner] = useState('');
  const [Servicedetails, setServicedetails] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVehicle = {
      Servicenumber,
      Vehiclenumber,
      Vehicletype,
      Servicegivendate,
      Estmtdtime,
      Vehicleowner,
      Servicedetails,
    };

    console.log(newVehicle);
    

    try {
      const res = await fetch('http://127.0.0.1:5000/addvehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVehicle),
      });
      console.log(res);

      if (res.ok) {
        navigate("/view-vehicles");
      } else {
        console.error("Error:", errorData);
      }
    } catch (err) {
      console.error("Error connecting to backend:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-96 h-96 mt-20 mb-16 ml-44 ">
      <h1 className="pl-20 text-2xl text-red-700 font-semibold">Add Vehicle</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <label htmlFor="Servicenumber">Service Number: </label>
        <input
          type="text"
          id="Servicenumber"
          name="Servicenumber"
          placeholder="Enter service number"
          value={Servicenumber}
          onChange={(e) => setServicenumber(e.target.value)}
        />
        <br />

        <label htmlFor="Vehiclenumber">Vehicle Number: </label>
        <input
          type="text"
          id="Vehiclenumber"
          name="Vehiclenumber"
          placeholder="Enter vehicle number"
          value={Vehiclenumber}
          onChange={(e) => setVehiclenumber(e.target.value)}
        />
        <br />

        <label htmlFor="Vehicletype">Vehicle Type: </label>
        <input
          type="text"
          id="Vehicletype"
          name="Vehicletype"
          placeholder="Enter vehicle type"
          value={Vehicletype}
          onChange={(e) => setVehicletype(e.target.value)}
        />
        <br />

        <label htmlFor="Servicegivendate">Service Given Date: </label>
        <input
          type="date"
          id="Servicegivendate"
          name="Servicegivendate"
          value={Servicegivendate}
          onChange={(e) => setServicegivendate(e.target.value)}
        />
        <br />

        <label htmlFor="Estmtdtime">Estimated Time: </label>
        <input
          type="time"
          id="Estmtdtime"
          name="Estmtdtime"
          value={Estmtdtime}
          onChange={(e) => setEstmtdtime(e.target.value)}
        />
        <br />

        <label htmlFor="Vehicleowner">Vehicle Owner: </label>
        <input
          type="text"
          id="Vehicleowner"
          name="Vehicleowner"
          placeholder="Enter vehicle owner"
          value={Vehicleowner}
          onChange={(e) => setVehicleowner(e.target.value)}
        />
        <br />

        <label htmlFor="Servicedetails">Service Details: </label>
        <input
          type="text"
          id="Servicedetails"
          name="Servicedetails"
          placeholder="Enter service details"
          value={Servicedetails}
          onChange={(e) => setServicedetails(e.target.value)}
        />
        <br />

        <button
          type="submit"
          className="ml-16 mt-4 w-32 h-10 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
