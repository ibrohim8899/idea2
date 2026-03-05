# AI Idea Landing (Frontend + Telegram Bot)

Loyiha backend server ishlatmaydi. Formdan kelgan ma'lumot to'g'ridan-to'g'ri Telegram botga yuboriladi.

## Ishga tushirish
```bash
npm install
cp .env.example .env
npm run dev
```

PowerShell:
```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Frontend: `http://localhost:5173`

## Telegram sozlash
1. Telegram'da bot yarating (`@BotFather`) va token oling.
2. Botni xabar kelishi kerak bo'lgan guruh/kanalga qo'shing.
3. `chat_id` ni oling:
   - Botga test xabar yuboring.
   - `https://api.telegram.org/bot<TOKEN>/getUpdates` ni ochib `chat.id` ni oling.
4. `.env` ni to'ldiring:
```env
VITE_TELEGRAM_BOT_TOKEN=1234567890:YOUR_BOT_TOKEN
VITE_TELEGRAM_CHAT_ID=-1001234567890
VITE_TELEGRAM_TOPIC_ID=
```

`VITE_TELEGRAM_TOPIC_ID` faqat forum-topic ishlatsangiz kerak bo'ladi.

## Test qilish
1. Formni to'ldiring.
2. Submit bosing.
3. Bot chatiga quyidagi ma'lumotlar boradi:
   - firstName, lastName, email, phone, idea, language, userAgent

## Muhim xavfsizlik
Bu yechimda `VITE_` env qiymatlari brauzerga chiqadi, ya'ni bot token frontend bundle ichida ko'rinadi. Bu tez prototip uchun qulay, lekin production uchun xavfli.
