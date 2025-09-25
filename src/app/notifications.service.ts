import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PushNotificationService {
  private baseUrl = 'https://core.haras.space/api/v1/notifications';

  constructor(private http: HttpClient) {}

  async register() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.error('Push not supported');
      return;
    }

    const reg = await navigator.serviceWorker.register('/notifications.worker.js');
    await navigator.serviceWorker.ready;

    const response = await this.http.get<{ publicKey: string }>(`${this.baseUrl}/publicKey`).toPromise();

    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array(response!.publicKey),
    });

    await this.http.post(`${this.baseUrl}/subscribe`, sub.toJSON()).toPromise();
    console.log('Subscribed and sent to server');
  }

  notify(title: string, body: string, url: string) {
    return this.http.post(`${this.baseUrl}/notify`, { title, body, url }).toPromise();
  }

  private urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
