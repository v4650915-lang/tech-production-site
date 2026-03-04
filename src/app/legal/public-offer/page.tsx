"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PublicOfferPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-3xl">
                {/* Кнопка назад */}
                <Button variant="ghost" asChild className="mb-8 -ml-2">
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        На главную
                    </Link>
                </Button>

                <article className="prose prose-stone max-w-none dark:prose-invert">
                    <h1 className="font-montserrat text-3xl font-bold mb-8">
                        Публичная оферта
                    </h1>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">1. Общие положения</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            1.1. Настоящая публичная оферта (далее — «Оферта») является официальным предложением ООО «Альянс-Менеджмент НВ» (РПК «Технология») заключить договор на оказание услуг широкоформатной печати, резки материалов и производства сувенирной продукции.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-2">
                            1.2. В соответствии с п. 2 ст. 437 Гражданского кодекса Российской Федерации, данный документ является публичной офертой, и в случае принятия условий (оформления заказа на сайте), физическое лицо приобретает статус Заказчика.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-2">
                            1.3. Полная и безоговорочная акцептация настоящей Оферты осуществляется путем оформления заказа на сайте и/или оплаты услуг.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">2. Предмет оферты</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            2.1. Исполнитель обязуется оказать Заказчику услуги по печати и производству продукции в соответствии с условиями заказа, а Заказчик обязуется оплатить эти услуги.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-2">
                            2.2. Виды услуг:
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1 ml-4">
                            <li>Широкоформатная печать (баннер, сетка, пленка)</li>
                            <li>Интерьерная печать</li>
                            <li>Плоттерная, ЧПУ и лазерная резка материалов</li>
                            <li>УФ-печать</li>
                            <li>Производство мобильных стендов (Roll-up, X-banner)</li>
                            <li>Сувенирная продукция (кружки, футболки, календари)</li>
                            <li>Изготовление мангалов и изделий с лазерной резкой</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">3. Порядок оформления заказа</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            3.1. Заказ оформляется через сайт путем добавления услуг в корзину и заполнения формы заказа.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-2">
                            3.2. После оформления заказа менеджер связывается с Заказчиком для уточнения деталей и подтверждения стоимости.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-2">
                            3.3. Срок изготовления продукции указывается менеджером при подтверждении заказа.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">4. Стоимость и порядок расчетов</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            4.1. Стоимость услуг рассчитывается на основе прайс-листа и параметров заказа (площадь, длина реза, количество).
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-2">
                            4.2. При объеме заказа свыше установленных порогов (50 м² для печати, 100 пог. м для резки) применяются оптовые цены.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-2">
                            4.3. Оплата производится наличными или безналичным расчетом после подтверждения заказа.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">5. Права и обязанности сторон</h2>
                        <p className="text-muted-foreground leading-relaxed">5.1. Исполнитель обязуется:</p>
                        <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1 ml-4">
                            <li>Оказать услуги качественно и в срок</li>
                            <li>Использовать исправное оборудование и качественные материалы</li>
                            <li>Согласовать с Заказчиком макет перед запуском в работу</li>
                        </ul>
                        <p className="text-muted-foreground leading-relaxed mt-4">5.2. Заказчик обязуется:</p>
                        <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1 ml-4">
                            <li>Предоставить макет в требуемом формате</li>
                            <li>Оплатить услуги в полном объеме</li>
                            <li>Принять готовую продукцию</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">6. Ответственность сторон</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            6.1. Исполнитель не несет ответственности за ошибки в макете, предоставленном Заказчиком.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-2">
                            6.2. При обнаружении брака Заказчик должен сообщить об этом в течение 24 часов после получения продукции.
                        </p>
                    </section>

                    <section className="mb-6 p-4 bg-muted/50 rounded-lg">
                        <h2 className="text-xl font-semibold mb-3">7. Реквизиты исполнителя</h2>
                        <p className="text-muted-foreground leading-relaxed font-medium">
                            ООО «Альянс-Менеджмент НВ» (РПК «Технология»)
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Адрес: ХМАО-Югра, г. Нижневартовск, ул. Мира, ЗП, стр. 1
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Телефон: 8 (3466) 31-22-04, 63-63-29
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Email: uv-nv@mail.ru
                        </p>
                    </section>
                </article>
            </div>
        </div>
    );
}
