// ده الكلاينت بتاعك (client.js)

const checkInterval = 10000; // كل 10 ثواني
let secondsActive = 0;

console.log("--- نظام مراقبة المعمل بدأ العمل ---");

// اللوب اللانهائي اللي أنت عايزه
setInterval(() => {
    secondsActive += 10;
    console.log(`الجهاز شغال بقاله: ${secondsActive} ثانية`);

    // هنا هتحط الكود اللي بيجيب حالة الماوس والكيبورد (iohook)
    const deviceStatus = {
        mac: "00:1A:2B:3C:4D:5E", // الـ ID بتاع الجهاز
        active: true, // هل الماوس اتحرك؟
        time: secondsActive
    };

    // بتبعت الريكويست للسيرفر
    // axios.post('http://server-ip:3000/client/info', deviceStatus)
    // .then(res => {
    //    if(res.data.command === 'shutdown') {
    //        console.log("جاري إغلاق الجهاز بأمر من السيرفر...");
    //        // كود الشات داون هنا
    //    }
    // });

}, checkInterval);

// السطر ده عشان البرنامج م يقفلش لو مفيش ريكويستات
process.stdin.resume();