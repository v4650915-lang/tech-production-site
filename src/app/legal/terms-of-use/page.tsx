"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfUsePage() {
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
                        Условия использования
                    </h1>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">1. Общие положения</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            1.1. Настоящие Условия использования (далее — «Условия») регулируют порядок использования сайта РПК «Технология» (далее — «Сайт»).
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-2">
                            1.2. Используя Сайт, вы соглашаетесь с настоящими Условиями. Если вы не согласны, пожалуйста, прекратите использование Сайта.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">2. Использование сайта</h2>
                        <p className="text-muted-foreground leading-relaxed">2.1. Сайт предназначен для:</p>
                        <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1 ml-4">
                            <li>Ознакомления с услугами и ценами</li>
                            <li>Расчета стоимости заказа через онлайн-калькуляторы</li>
                            <li>Оформления заказов на продукцию</li>
                        </ul>
                        <p className="text-muted-foreground leading-relaxed mt-4">2.2. Запрещается:</p>
                        <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1 ml-4">
                            <li>Использовать Сайт для распространения незаконной информации</li>
                            <li>Осуществлять взлом или попытки взлома Сайта</li>
                            <li>Использовать автоматические средства для доступа к Сайту</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">3. Интеллектуальная собственность</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            3.1. Все материалы Сайта (тексты, изображения, логотипы) являются собственностью ООО «Альянс-Менеджмент НВ».
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-2">
                            3.2. Копирование материалов возможно только с письменного разрешения правообладателя.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">4. Персональные данные</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            4.1. Предоставляя персональные данные через Сайт, вы даете согласие на их обработку в соответствии с Федеральным законом № 152-ФЗ.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-2">
                            4.2. Персональные данные используются исключительно для обработки заказов и не передаются третьим лицам.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">5. Ограничение ответственности</h2>
                        <p className="text-muted-foreground leading-relaxed">5.1. Администрация Сайта не несет ответственности за:</p>
                        <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1 ml-4">
                            <li>Временные перебои в работе Сайта</li>
                            <li>Потерю данных вследствие технических сбоев</li>
                            <li>Косвенный ущерб от использования Сайта</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3">6. Изменение условий</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            6.1. Администрация вправе изменять настоящие Условия в одностороннем порядке.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-2">
                            6.2. Актуальная версия Условий всегда доступна на Сайте.
                        </p>
                    </section>

                    <section className="mb-6 p-4 bg-muted/50 rounded-lg">
                        <h2 className="text-xl font-semibold mb-3">7. Контакты</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            По вопросам использования Сайта обращайтесь:
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Адрес: ХМАО-Югра, г. Нижневартовск, ул. Мира, ЗП, стр. 1
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Телефон: 8 (3466) 31-22-04
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
