package com.carapp.trip;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by deepa_shekhar on 9/15/15.
 */
public class JsonUtil {

    public static String toJSon(Trip t) {
        try {
            // Here we convert Java Object to JSON
            JSONObject jsonObj = new JSONObject();
            jsonObj.put("id", t.getId()); // Set the first name/pair
            jsonObj.put("start", t.getStart());
            jsonObj.put("stop", t.getStop()); // Set the first name/pair
            jsonObj.put("status", t.getStatus());
            jsonObj.put("vehicleId", t.getVehicleId()); // Set the first name/pair
            jsonObj.put("deviceId", t.getDeviceId());

            jsonObj.put("startPoint_longitude", t.getStartPoint().getCoordinates().get(0)); // Set the first name/pair
            jsonObj.put("startPoint_latitude", t.getStartPoint().getCoordinates().get(1));
            jsonObj.put("stopPoint_longitude", t.getStopPoint().getCoordinates().get(0)); // Set the first name/pair
            jsonObj.put("stopPoint_latitude", t.getStopPoint().getCoordinates().get(1));

            /*JSONObject jsonAdd = new JSONObject(); // we need another object to store the address
            jsonAdd.put("type", t.getStartPoint().getType());
            JSONArray jsonArr = new JSONArray();
            jsonArr.put(t.getStartPoint().getCoordinates().get(0));
            jsonArr.put(t.getStartPoint().getCoordinates().get(1));
            jsonAdd.put("coordinates", jsonArr);
            jsonObj.put("startPoint", jsonAdd);

            JSONObject jsonAdd2 = new JSONObject(); // we need another object to store the address
            jsonAdd.put("type", t.getStopPoint().getType());
            JSONArray jsonArr2 = new JSONArray();
            jsonArr2.put(t.getStopPoint().getCoordinates().get(0));
            jsonArr2.put(t.getStopPoint().getCoordinates().get(1));
            jsonAdd.put("coordinates", jsonArr2);
            jsonObj.put("stopPoint", jsonAdd2);*/

            // In this case we need a json array to hold the java list
            //JSONObject jsonAdd3 = new JSONObject();
            jsonObj.put("averageLoad",t.getAverageLoad());
            jsonObj.put("averageMovingSpeed",t.getAverageMovingSpeed());
            jsonObj.put("averageSpeed",t.getAverageSpeed());
            jsonObj.put("distance",t.getDistance());
            jsonObj.put("distanceByGPS",t.getDistanceByGPS());
            jsonObj.put("distanceByVSS",t.getDistanceByVSS());
            jsonObj.put("duration",t.getDuration());
            jsonObj.put("fuelConsumed",t.getFuelConsumed());
            jsonObj.put("fuelEconomy",t.getFuelEconomy());
            jsonObj.put("hardAccelCount",t.getHardAccelCount());
            jsonObj.put("hardBrakeCount",t.getHardBrakeCount());
            jsonObj.put("locationCount",t.getLocationCount());
            jsonObj.put("maxSpeed",t.getMaxSpeed());
            jsonObj.put("messageCount",t.getMessageCount());
            jsonObj.put("stdDevMovingSpeed",t.getStdDevMovingSpeed());
            jsonObj.put("stopCount",t.getStopCount());
            //jsonObj.put("stats", jsonAdd3);

            /*JSONObject jsonAdd4 = new JSONObject();
            jsonAdd4.put("self",t.getSelf());
            jsonAdd4.put("device",t.getDevice());
            jsonAdd4.put("vehicle",t.getVehicle());
            jsonAdd4.put("locations",t.getLocations());
            jsonAdd4.put("messages",t.getMessages());
            jsonAdd4.put("events",t.getEvents());
            jsonObj.put("links", jsonAdd4);*/
            //JSONObject tripObj = new JSONObject();
            //tripObj.put("trip",jsonObj);
            Log.i("MainActivity", jsonObj.toString());

            return jsonObj.toString();

        } catch (JSONException ex) {
            ex.printStackTrace();
        }

        return null;

    }
}