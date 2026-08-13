# Pabbly Connect & Facebook Lead Ads Integration Guide

This guide explains how to connect your Facebook Lead Ads form to the RushiPandit Staff Portal via Pabbly Connect.

---

## 1. Webhook URL Setup in Pabbly Connect

In your Pabbly Connect Workflow:

1. **Trigger**: Select **Facebook Lead Ads** ➔ Action Event: **New Lead (Real-Time)**.
2. **Connect Account**: Connect your Facebook Page & select your Lead Gen Form.
3. **Action**: Select **API by Pabbly** or **Custom Webhook**.
4. **HTTP Method**: `POST`
5. **API Endpoint URL**:
   ```
   http://72.61.228.175:3000/api/webhooks/pabbly-leads?secret=rushi_pabbly_secret_2026
   ```
   *(Replace domain with your domain once SSL is configured)*.

---

## 2. Request Body Parameters (JSON)

Configure the JSON Payload in Pabbly to map Facebook form fields:

```json
{
  "full_name": "{{1.full_name}}",
  "phone_number": "{{1.phone_number}}",
  "email": "{{1.email}}",
  "platform": "Facebook",
  "industry": "Digital Marketing",
  "Learner is -": "{{1.learner_category}}",
  "Where do you live?": "{{1.city_location}}",
  "Why do you want to learn digital marketing?": "{{1.learning_objective}}"
}
```

> 💡 **Note**: Any custom field you add to your Facebook Lead Form (e.g. *"Preferred Batch Time"*, *"Prior Experience"*, *"City"*) will automatically save in the lead's `qualification_answers` JSON drawer without requiring any code changes!

---

## 3. Industry Round-Robin Auto Assignment

The system automatically detects the `industry` parameter (`Digital Marketing`, `Share Market`, `AI Course`, etc.) and assigns the lead to the next active sales representative in line for that specific industry.

---

## 4. WhatsApp Visit Message Trigger

When a sales representative marks a lead's call outcome as **Visit Scheduled**, they can click the **WhatsApp** icon on the lead row to open a pre-filled WhatsApp invitation containing the institute's location link and counselling details.
