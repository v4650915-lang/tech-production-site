import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer id="contacts" className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-4">ТЕХНОЛОГИЯ</h3>
            <p className="text-sm text-muted-foreground">
              Рекламно-производственная компания полного цикла. 
              Широкоформатная печать, резка материалов, сувенирная продукция.
            </p>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-3">
              <a href="tel:+73466312204" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <Phone className="h-4 w-4" />
                <span>8 (3466) 31-22-04</span>
              </a>
              <a href="tel:+73466636329" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <Phone className="h-4 w-4" />
                <span>63-63-29</span>
              </a>
              <a href="mailto:uv-nv@mail.ru" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <Mail className="h-4 w-4" />
                <span>uv-nv@mail.ru</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>ХМАО-Югра, г. Нижневартовск,<br />ул. Мира, ЗП, стр. 1</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#printing" className="hover:text-foreground">Широкоформатная печать</Link></li>
              <li><Link href="#cutting" className="hover:text-foreground">Плоттерная резка</Link></li>
              <li><Link href="#cutting" className="hover:text-foreground">ЧПУ резка</Link></li>
              <li><Link href="#cutting" className="hover:text-foreground">Лазерная резка</Link></li>
              <li><Link href="#stands" className="hover:text-foreground">Мобильные стенды</Link></li>
              <li><Link href="#souvenirs" className="hover:text-foreground">Сувенирная продукция</Link></li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="font-semibold mb-4">
              <Clock className="h-4 w-4 inline mr-2" />
              Режим работы
            </h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <div>
                <span className="font-medium">Пн-Пт:</span> 9:00 - 18:00
              </div>
              <div>
                <span className="font-medium">Сб-Вс:</span> Выходной
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 РПК «Технология». Все права защищены.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/legal/public-offer.md" target="_blank" className="hover:text-foreground underline">
              Публичная оферта
            </Link>
            <Link href="/legal/terms-of-use.md" target="_blank" className="hover:text-foreground underline">
              Условия использования
            </Link>
          </div>
          <p>ООО «Альянс-Менеджмент НВ»</p>
        </div>
      </div>
    </footer>
  );
}
