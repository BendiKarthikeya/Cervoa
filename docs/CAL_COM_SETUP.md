# 📅 CAL.COM INTEGRATION GUIDE

## Your Cal.com Credentials
- **API Key:** `cal_live_f142927a447de749cfef658a92a9f56d`

---

## 🔄 Cal.com vs Calendly

You're using **Cal.com** (open-source alternative to Calendly).

### Cal.com API Endpoints:

**Base URL:** `https://api.cal.com/v1`

**Get Bookings:**
```
GET https://api.cal.com/v1/bookings
Headers: 
  Authorization: Bearer cal_live_f142927a447de749cfef658a92a9f56d
```

**Webhook for New Bookings:**
```
POST https://api.cal.com/v1/webhooks
```

---

## 🎯 n8n Workflow Configuration for Cal.com

### Workflow 3: Meeting Scheduler (Cal.com Version)

**Trigger:** Cal.com Webhook

**Steps:**
1. **Cal.com Webhook** - Receives new booking
2. **Extract Data** - Parse booking details
3. **Airtable** - Save to Meetings table
4. **Brevo** - Send confirmation email

---

## 📋 Cal.com Webhook Setup:

1. **In Cal.com Dashboard:**
   - Go to Settings → Developer → Webhooks
   - Click "New Webhook"
   - Subscribe to: `BOOKING_CREATED`
   - Payload URL: (Get from n8n after importing workflow)

2. **In n8n:**
   - Import WORKFLOW_3_Calendly_Meeting_Scheduling.json
   - Replace Calendly trigger with Cal.com HTTP webhook
   - Map Cal.com booking data to Airtable

---

## 🔌 Cal.com Booking Data Structure:

When a booking is created, Cal.com sends:

```json
{
  "triggerEvent": "BOOKING_CREATED",
  "payload": {
    "id": 123456,
    "uid": "abc123",
    "title": "30 Min Meeting",
    "startTime": "2025-12-20T15:00:00Z",
    "endTime": "2025-12-20T15:30:00Z",
    "attendees": [
      {
        "name": "John Doe",
        "email": "john@example.com",
        "timeZone": "America/New_York"
      }
    ],
    "eventTypeId": 789,
    "location": "Zoom",
    "status": "ACCEPTED"
  }
}
```

---

## 🎯 Mapping to Airtable (Meetings Table):

```javascript
{
  "Company": "{{$json.payload.attendees[0].email.split('@')[1]}}",
  "Contact Name": "{{$json.payload.attendees[0].name}}",
  "Email": "{{$json.payload.attendees[0].email}}",
  "Date": "{{$json.payload.startTime}}",
  "Duration": 30,  // Extract from startTime - endTime
  "Meeting Type": "{{$json.payload.title}}",
  "Status": "Scheduled"
}
```

---

## 🚀 Quick Setup in n8n:

### Option 1: Use HTTP Webhook
```
1. Add "Webhook" node (trigger)
2. Get webhook URL from n8n
3. Add to Cal.com settings
4. Map Cal.com data to Airtable
```

### Option 2: Poll Cal.com API
```
1. Use "Schedule Trigger" (every 5 minutes)
2. HTTP Request to: GET https://api.cal.com/v1/bookings
3. Filter new bookings
4. Save to Airtable
```

---

## 📊 Cal.com API Endpoints You'll Need:

**List Bookings:**
```bash
curl -X GET 'https://api.cal.com/v1/bookings' \
  -H 'Authorization: Bearer cal_live_f142927a447de749cfef658a92a9f56d'
```

**Get Event Types:**
```bash
curl -X GET 'https://api.cal.com/v1/event-types' \
  -H 'Authorization: Bearer cal_live_f142927a447de749cfef658a92a9f56d'
```

**Create Booking (if needed):**
```bash
curl -X POST 'https://api.cal.com/v1/bookings' \
  -H 'Authorization: Bearer cal_live_f142927a447de749cfef658a92a9f56d' \
  -H 'Content-Type: application/json' \
  -d '{
    "eventTypeId": 123,
    "start": "2025-12-20T15:00:00Z",
    "responses": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  }'
```

---

## ✅ What This Enables:

- Automatically track all Cal.com bookings in Airtable
- Send confirmation emails via Brevo
- Update lead status when meetings are booked
- Display meetings on your dashboard

---

## 🔗 Resources:

- **Cal.com API Docs:** https://cal.com/docs/api-reference
- **Cal.com Webhooks:** https://cal.com/docs/api-reference/webhooks
- **Your Cal.com Dashboard:** https://app.cal.com/settings/developer

---

**Ready to set up the meeting workflow!** ✅
