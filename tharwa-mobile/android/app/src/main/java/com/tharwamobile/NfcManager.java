package com.tharwamobile;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Arguments;

import android.app.Activity;
import android.nfc.*;

public class NfcManager extends ReactContextBaseJavaModule{
  NfcAdapter nfcAdapter;
  ReactApplicationContext context;

  public NfcManager(ReactApplicationContext context) {
    super(context);
    this.context = context;
  }

  @Override
  public String getName() {
    return "NfcManager";
  }

  @ReactMethod
  public void setMessage(String message) {
    final Activity activity = getCurrentActivity();
    NfcAdapter nfcAdapter = NfcAdapter.getDefaultAdapter(activity);
    byte[] bytesOut = message.getBytes();
    NdefRecord ndefRecordOut = new NdefRecord(NdefRecord.TNF_MIME_MEDIA, "text/plain".getBytes(), new byte[] {}, bytesOut);
    nfcAdapter.setNdefPushMessage(new NdefMessage(ndefRecordOut), activity);
  }
}