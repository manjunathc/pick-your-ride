package com.carapp.trip;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by deepa_shekhar on 9/15/15.
 */
public class Trip {


    private String id="a51a3c87-baa7-4e5d-98e6-4f9588d7c2e1";

    private String start;
    private String stop;
    private String status = "completed";
    private String vehicleId = "536738SKSKKDKSNH6";

    public void setStart(String start) {
        this.start = start;
    }

    public void setStop(String stop) {
        this.stop = stop;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public String getId() {
        return id;
    }

    public String getStart() {
        return start;
    }

    public String getStop() {
        return stop;
    }

    public String getStatus() {
        return status;
    }

    public String getVehicleId() {
        return vehicleId;
    }

    private String deviceId = "fe4bbc20-cc90-11e3-8e05-f3abac5b6b58";

    public Point getStartPoint() {
        return startPoint;
    }

    public void setStartPoint(Point startPoint) {
        this.startPoint = startPoint;
    }

    public void setStartPoint(String latitude, String longitude) {
        this.startPoint = new Point(latitude,longitude);
    }

    public Point getStopPoint() {
        return stopPoint;
    }

    public void setStopPoint(Point stopPoint) {
        this.stopPoint = stopPoint;
    }

    public void setStopPoint(String latitude, String longitude) {
        this.stopPoint = new Point(latitude,longitude);
    }

    private Point startPoint;
    private Point stopPoint;

    public class Point {

        Point(String latitude, String longitude)
        {
            this.setCoordinates(latitude,longitude);
        }

        public String getType() {
            return type;
        }

        public List<String> getCoordinates() {
            return coordinates;
        }

        public void setCoordinates(String latitude, String longitude) {
            this.coordinates = new ArrayList<String>();
            coordinates.add(latitude);
            coordinates.add(longitude);
        }

        private String type = "Point";
        private List<String> coordinates;
    }

        private String averageLoad = "42.6683";
        private String averageMovingSpeed = "23.1505";
        private String averageSpeed = "15.4892";
        private String distance = "2125.35";
        private String distanceByGPS = "42.6683";
        private String distanceByVSS = "23.1505";
        private String duration = "42.6683";
        private String fuelConsumed = "23.1505";
        private String fuelEconomy = "42.6683";
        private String hardAccelCount = "23.1505";
        private String hardBrakeCount = "42.6683";
        private String locationCount = "23.1505";
        private String maxSpeed = "42.6683";
        private String messageCount = "23.1505";
        private String stdDevMovingSpeed = "42.6683";
        private String stopCount = "23.1505";


        public String getAverageLoad() {
            return averageLoad;
        }

        public String getAverageMovingSpeed() {
            return averageMovingSpeed;
        }

        public String getAverageSpeed() {
            return averageSpeed;
        }

        public String getDistance() {
            return distance;
        }

        public String getDistanceByGPS() {
            return distanceByGPS;
        }

        public String getDistanceByVSS() {
            return distanceByVSS;
        }

        public String getDuration() {
            return duration;
        }

        public String getFuelConsumed() {
            return fuelConsumed;
        }

        public String getFuelEconomy() {
            return fuelEconomy;
        }

        public String getHardAccelCount() {
            return hardAccelCount;
        }

        public String getHardBrakeCount() {
            return hardBrakeCount;
        }

        public String getLocationCount() {
            return locationCount;
        }

        public String getMaxSpeed() {
            return maxSpeed;
        }

        public String getMessageCount() {
            return messageCount;
        }

        public String getStdDevMovingSpeed() {
            return stdDevMovingSpeed;
        }

        public String getStopCount() {
            return stopCount;
        }


  /*      public String getSelf() {
            return self;
        }

        public String getDevice() {
            return device;
        }

        public String getVehicle() {
            return vehicle;
        }

        public String getLocations() {
            return locations;
        }

        public String getMessages() {
            return messages;
        }

        public String getEvents() {
            return events;
        }

        private String self = "https://trips.vin.li/api/v1/trips/a51a3c87-baa7-4e5d-98e6-4f9588d7c2e1";
        private String device = "https://platform.vin.li/api/v1/devices/fe4bbc20-cc90-11e3-8e05-f3abac5b6b58";
        private String vehicle = "https://platform.vin.li/api/v1/vehicles/0c785aa0-1a48-4cc6-9f5c-028350dd907d";
        private String locations = "https://telemetry.vin.li/api/v1/devices/fe4bbc20-cc90-11e3-8e05-f3abac5b6b58/locations?since=1440012315951&until=1440012928875";
        private String messages = "https://telemetry.vin.li/api/v1/devices/fe4bbc20-cc90-11e3-8e05-f3abac5b6b58/messages?since=1440012315951&until=1440012928875";
        private String events = "https://events.vin.li/api/v1/devices/fe4bbc20-cc90-11e3-8e05-f3abac5b6b58/events?since=1440012315951&until=1440012928875";
*/
}
