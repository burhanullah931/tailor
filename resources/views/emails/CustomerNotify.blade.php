@component('mail::message')

Dear <b>{{$customer->name}}</b>

Congratulation! you have successfully registered with <b>Classic Tailor</b>. <br>

Your Email: {{$customer->email}}.

Your Password: tailor@123.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
