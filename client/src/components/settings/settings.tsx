import "./settings.css";
import { Select, FormControl, Button, MenuItem, SelectChangeEvent } from "@mui/material";
import DBService from "../../services/DBService";
import routeCalculation from "../../helperFunctions/routeCalculation";
import { useEffect } from "react";
import {
  CalculationSettings,
  DynamicMarkers,
} from "../../Interfaces/interfaces";

type SettingsPropsTypes = {
  markers: DynamicMarkers;
  settingsData: CalculationSettings;
  setSettingsData: (newCalculationSettings: CalculationSettings) => void;
  setMarkers: (newDynamcMarkers: DynamicMarkers) => void;
  closeOverlay: () => void;
  setSettingsClicked: (clicked:Boolean) => void;
};

function Settings({
  closeOverlay,
  settingsData,
  setSettingsData,
  markers,
  setMarkers,
  setSettingsClicked,
}: SettingsPropsTypes) {
  // Effect to handle updates based on settingsData changes
  useEffect(() => {
    const updateMarkers = async () => {
      if (settingsData.speed !== undefined) {
        const updatedMarkers = await routeCalculation(
          Object.values(markers),
          settingsData
        );
        DBService.updateAllMarkers(updatedMarkers);
        setMarkers(updatedMarkers);
      }
    };

    updateMarkers();
  }, [settingsData, markers, setMarkers]); // Trigger on settingsData change

  const changeSpeedSetting = (event: SelectChangeEvent<number>) :void => {
    setSettingsData({ ...settingsData, speed: Number(event.target.value) });
  };



  return (
    <div style={{ marginBottom: "10px" }} className="settingsScreen">
      <h1>Settings</h1>
      <form style={{ marginBottom: "10px" }}>
        <FormControl>
          <Select value={settingsData.speed} onChange={changeSpeedSetting}>
            <MenuItem value="2">2Kmph - Slow</MenuItem>
            <MenuItem value="3">3Kmph - Regular</MenuItem>
            <MenuItem value="4">4Kmph - Fast</MenuItem>
            <MenuItem value="5">5Kmph - Lightning</MenuItem>
          </Select>
        </FormControl>

      </form>
      <Button variant="contained" className="backButton" onClick={closeOverlay}>
        Back
      </Button>
    </div>
  );
}

export default Settings;
