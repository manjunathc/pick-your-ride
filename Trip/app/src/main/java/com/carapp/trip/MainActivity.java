package com.carapp.trip;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.format.Time;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TextView;

import com.openxc.NoValueException;
import com.openxc.VehicleManager;
import com.openxc.measurements.IgnitionStatus;
import com.openxc.measurements.Latitude;
import com.openxc.measurements.Longitude;
import com.openxc.measurements.Measurement;
import com.openxc.measurements.UnrecognizedMeasurementTypeException;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.InputStreamEntity;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.entity.ContentType;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    private VehicleManager mVehicleManager;
    private TextView mJsonTextView;
    private IgnitionStatus.IgnitionPosition tripStatus = IgnitionStatus.IgnitionPosition.OFF;
    private static final String TAG = "TripActivity";

    Trip t;
    String deviceId;
    Calendar cal = GregorianCalendar.getInstance();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mJsonTextView = (TextView) findViewById(R.id.vehicle_json);
    }

    @Override
    public void onPause() {
        super.onPause();
        // When the activity goes into the background or exits, we want to make
        // sure to unbind from the service to avoid leaking memory
        if(mVehicleManager != null) {
            Log.i(TAG, "Unbinding from Vehicle Manager");
            // Remember to remove your listeners, in typical Android
            // fashion.
            mVehicleManager.removeListener(IgnitionStatus.class,
                    mStateListener);
            unbindService(mConnection);
            mVehicleManager = null;
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public void onResume() {
        super.onResume();

        if(mVehicleManager == null) {
            Intent intent = new Intent(this, VehicleManager.class);
            bindService(intent, mConnection, Context.BIND_AUTO_CREATE);
            //deviceId = mVehicleManager.getVehicleInterfaceDeviceId();
        }
    }

    /*private void makePostRequest(String input) {

        HttpClient httpClient = new DefaultHttpClient();
        // replace with your url
        HttpPost httpPost = new HttpPost("http://localhost:3000/api/trips");

        //Post Data
        List<NameValuePair> nameValuePair = new ArrayList<NameValuePair>(2);
        nameValuePair.add(new BasicNameValuePair("tripdetails", input));

        //Encoding POST data
        try {
            httpPost.setEntity(new UrlEncodedFormEntity(nameValuePair));
        } catch (UnsupportedEncodingException e) {
            // log exception
            e.printStackTrace();
        }

        //making POST request.
        try {
            HttpResponse response = httpClient.execute(httpPost);
            // write response to log
            Log.d(TAG,"Http Post Response:"+ response.toString());
        } catch (ClientProtocolException e) {
            // Log exception
            e.printStackTrace();
        } catch (IOException e) {
            // Log exception
            e.printStackTrace();
        }

    }*/

    /*private void makePostRequest(String input) {

        HttpClient c = new DefaultHttpClient();
        HttpGet p = new HttpGet("http://10.0.2.2:50000/_get_data");
        //p.setHeader("Content-type", "application/json");
           //     ContentType.APPLICATION_JSON));
       // InputStream stream = new ByteArrayInputStream(input.getBytes());
        //InputStreamEntity en = new InputStreamEntity(stream,ContentType.APPLICATION_JSON);
        //p.setEntity(en);

        try {
            //p.setEntity(new StringEntity(input));
            //HttpResponse r = c.execute(p);
            HttpResponse response = c.execute(p);

            System.out.println("Response Code : "
                    + response.getStatusLine().getStatusCode());

            BufferedReader rd = new BufferedReader(
                    new InputStreamReader(response.getEntity().getContent()));

            StringBuffer result = new StringBuffer();
            String line = "";
            while ((line = rd.readLine()) != null) {
                result.append(line);
            }
            final String temp = result.toString();
            MainActivity.this.runOnUiThread(new Runnable() {
                public void run() {
                    // Finally, we've got a new value and we're running on the
                    // UI thread - we set the text of the EngineSpeed view to
                    // the latest value
                    mJsonTextView.setText(temp);
                }
            });
        }catch (UnsupportedEncodingException e)
        {
            e.printStackTrace();
        }
        catch (IOException e) {
            e.printStackTrace();
        }

    }*/

    private void makePostRequest(String input) {

        HttpClient c = new DefaultHttpClient();
        HttpPost p = new HttpPost("http://10.0.2.2:3000/api/trips");
        p.setHeader("Content-type", "application/json");
          //   ContentType.APPLICATION_JSON));
        // InputStream stream = new ByteArrayInputStream(input.getBytes());
        //InputStreamEntity en = new InputStreamEntity(stream,ContentType.APPLICATION_JSON);
        //p.setEntity(en);

        try {
            p.setEntity(new StringEntity(input));
            //HttpResponse r = c.execute(p);
            HttpResponse response = c.execute(p);

            System.out.println("Response Code : "
                    + response.getStatusLine().getStatusCode());

            BufferedReader rd = new BufferedReader(
                    new InputStreamReader(response.getEntity().getContent()));

            StringBuffer result = new StringBuffer();
            String line = "";
            while ((line = rd.readLine()) != null) {
                result.append(line);
            }
            final String temp = result.toString();
            MainActivity.this.runOnUiThread(new Runnable() {
                public void run() {
                    // Finally, we've got a new value and we're running on the
                    // UI thread - we set the text of the EngineSpeed view to
                    // the latest value
                    mJsonTextView.setText(temp);
                }
            });
        }catch (UnsupportedEncodingException e)
        {
            e.printStackTrace();
        }
        catch (IOException e) {
            e.printStackTrace();
        }

    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    /* This is an OpenXC measurement listener object - the type is recognized
     * by the VehicleManager as something that can receive measurement updates.
     * Later in the file, we'll ask the VehicleManager to call the receive()
     * function here whenever a new EngineSpeed value arrives.
     */
    IgnitionStatus.Listener mStateListener = new IgnitionStatus.Listener() {
        @Override
        public void receive(Measurement measurement) {
            // When we receive a new EngineSpeed value from the car, we want to
            // update the UI to display the new value. First we cast the generic
            // Measurement back to the type we know it to be, an EngineSpeed.
            final IgnitionStatus status = (IgnitionStatus) measurement;
            if (!status.getValue().enumValue().equals(tripStatus))
            {
                //The trip status has changed
                tripStatus = status.getValue().enumValue();
                if (tripStatus.equals(IgnitionStatus.IgnitionPosition.OFF))
                {
                    //trip has ended, now capture the end details
                    t.setStop(sdf.format(new Date()));
                    try {
                        Latitude lat = (Latitude) mVehicleManager.get(Latitude.class);
                        Longitude lon = (Longitude) mVehicleManager.get(Longitude.class);
                        t.setStopPoint(String.valueOf(lat.getValue().doubleValue()),String.valueOf(lon.getValue().doubleValue()));
                    } catch(NoValueException e) {
                        Log.w(TAG, "The vehicle may not have made the measurement yet");
                    } catch(UnrecognizedMeasurementTypeException e) {
                        Log.w(TAG, "The measurement type was not recognized");
                    }

                    //post trip details
                    final String json = JsonUtil.toJSon(t);

                    // In order to modify the UI, we have to make sure the code is
                    // running on the "UI thread" - Google around for this, it's an
                    // important concept in Android.
                    MainActivity.this.runOnUiThread(new Runnable() {
                        public void run() {
                            // Finally, we've got a new value and we're running on the
                            // UI thread - we set the text of the EngineSpeed view to
                            // the latest value
                            mJsonTextView.setText("Trip Ended: "
                                    + status.getValue().toString() + "\nat " + t.getStop()
                                    + "\nin (" + t.getStopPoint().getCoordinates().get(0) + ","
                                    + t.getStopPoint().getCoordinates().get(1) + ")"
                                    + "\n\nJSON: " + json);
                        }
                    });

                    makePostRequest(json);

                }
                if (tripStatus.equals(IgnitionStatus.IgnitionPosition.START))
                {
                    //trip has started, Save all intial coordinates
                    t = new Trip();
                    //set device id
                    //t.setDeviceId(deviceId);
                    t.setStart(sdf.format(new Date()));
                    try {
                        Latitude lat = (Latitude) mVehicleManager.get(Latitude.class);
                        Longitude lon = (Longitude) mVehicleManager.get(Longitude.class);
                        t.setStartPoint(String.valueOf(lat.getValue().doubleValue()),String.valueOf(lon.getValue().doubleValue()));
                    } catch(NoValueException e) {
                        Log.w(TAG, "The vehicle may not have made the measurement yet");
                    } catch(UnrecognizedMeasurementTypeException e) {
                        Log.w(TAG, "The measurement type was not recognized");
                    }

                    // In order to modify the UI, we have to make sure the code is
                    // running on the "UI thread" - Google around for this, it's an
                    // important concept in Android.
                    MainActivity.this.runOnUiThread(new Runnable() {
                        public void run() {
                            // Finally, we've got a new value and we're running on the
                            // UI thread - we set the text of the EngineSpeed view to
                            // the latest value
                            mJsonTextView.setText("Trip Started: "
                                    + status.getValue().toString()+ "\nat "+t.getStart()
                                    + "\nin (" +t.getStartPoint().getCoordinates().get(0)+","
                                    +t.getStartPoint().getCoordinates().get(1)+")");
                        }
                    });
                }
            }

        }
    };

    private ServiceConnection mConnection = new ServiceConnection() {
        // Called when the connection with the VehicleManager service is
        // established, i.e. bound.
        public void onServiceConnected(ComponentName className,
                                       IBinder service) {
            Log.i(TAG, "Bound to VehicleManager");
            // When the VehicleManager starts up, we store a reference to it
            // here in "mVehicleManager" so we can call functions on it
            // elsewhere in our code.
            mVehicleManager = ((VehicleManager.VehicleBinder) service)
                    .getService();

            // We want to receive updates whenever the EngineSpeed changes. We
            // have an EngineSpeed.Listener (see above, mSpeedListener) and here
            // we request that the VehicleManager call its receive() method
            // whenever the EngineSpeed changes
            mVehicleManager.addListener(IgnitionStatus.class, mStateListener);
        }

        // Called when the connection with the service disconnects unexpectedly
        public void onServiceDisconnected(ComponentName className) {
            Log.w(TAG, "VehicleManager Service  disconnected unexpectedly");
            mVehicleManager = null;
        }
    };

}
