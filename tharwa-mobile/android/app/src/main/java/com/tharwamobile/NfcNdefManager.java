package com.tharwamobile;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Arguments;

import android.app.Activity;
import android.content.Intent;
import android.os.Parcelable;
import android.nfc.*;

public class NfcNdefManager extends ReactContextBaseJavaModule{
  NfcAdapter nfcAdapter;
  ReactApplicationContext context;

  public NfcNdefManager(ReactApplicationContext context) {
    super(context);
    this.context = context;
  }

  @Override
  public String getName() {
    return "NfcNdefManager";
  }

  @ReactMethod
  public void setMessage(String message) {
    final Activity activity = getCurrentActivity();
    nfcAdapter = NfcAdapter.getDefaultAdapter(activity);
    byte[] bytesOut = message.getBytes();
    NdefRecord ndefRecordOut = new NdefRecord(NdefRecord.TNF_MIME_MEDIA, "text/plain".getBytes(), new byte[] {}, bytesOut);
    nfcAdapter.setNdefPushMessage(new NdefMessage(ndefRecordOut), activity);
  }

  @ReactMethod
  public void getMessages(Callback callback) {
    Intent nfcIntent = getCurrentActivity().getIntent();
    WritableArray receivedMessages = Arguments.createArray();
    receivedMessages.pushString("hello");
    
    Parcelable[] receivedArray = nfcIntent.getParcelableArrayExtra(NfcAdapter.EXTRA_NDEF_MESSAGES);
    if(receivedArray != null) {
      NdefMessage receivedMessage = (NdefMessage) receivedArray[0];
      NdefRecord[] attachedRecords = receivedMessage.getRecords();

      for (NdefRecord record : attachedRecords) {
        String string = new String(record.getPayload());
        if(string != null) receivedMessages.pushString(string);
      }
    }

    callback.invoke(receivedMessages);
  }
}