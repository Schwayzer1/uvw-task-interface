This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

-npm install
-npm run dev

## Admin kullanıcı bilgileri

---

email : admin@admin.com
şifre : 123456

---

```md
# UVW Mühendislik - Görev Yönetim Frontend (Next.js)

Bu proje, kullanıcıların projeleri ve görevleri yönetebildiği bir dashboard arayüzüdür. Next.js ile geliştirilmiş, Tailwind CSS ile stillendirilmiştir.

---

## 🚀 Kullanılan Teknolojiler

- **Next.js 15 (App Router)**
- **React 19**
- **Tailwind CSS**
- **TypeScript**
- **next-auth** ile oturum yönetimi
- **Zod + React Hook Form** ile form validasyonu
- **Axios** ile API istekleri
- **Shadcn** ile Komponent Kütüphanesi
- **Lucide React** (ikonlar)
- **Sonner** (bildirimler)
- **SSR + CSR hibrit yaklaşımı**

---

## 🧱 Sayfa Yapısı ve Rotalar

- `/login` – Giriş sayfası
- `/register` – Kayıt sayfası
- `/dashboard` – Projelerin listelendiği panel
- `/dashboard/users` – Kayıtlı kullanıcı listesi ve rol güncelleme
- `/dashboard/project/create` – Yeni Proje oluşturma sayfası
- `/dashboard/project/[projectId]` – Proje detay ve görev listesi ve taskların listelendiği güncellendiği bölüm

---

## ✨ Ek Özellik: Görev Güncelleme Logları

- Her görevin geçmiş değişiklikleri `TaskLogsModal` içinde görüntülenebilir.
- Loglar, kullanıcı adı ve tarih bilgisiyle gösterilir.

## 🧪 Test Senaryosu Örneği (manuel)

- Bir görev güncellendiğinde, görev detayına girerek yapılan değişiklik loglarını görebilirsiniz.
- Admin/Manager dışında Developer rolü görev silemez veya güncelleyemez.

## 🌐 Oturum Yönetimi

- `next-auth` kullanılarak JWT tabanlı oturum yönetimi yapılır.
- `SessionProvider` ile global context üzerinden kullanıcı bilgisi erişilebilir.
```

## 🛠 Ortam Değişkenleri `.env`

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXTAUTH_SECRET=sch123
NEXTAUTH_URL=http://localhost:3001
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```
