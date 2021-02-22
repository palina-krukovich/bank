insert into client (address, birth_date, bound_to_military_service, date_of_issue, disability, email, gender, home_number, id_number, issued_by, middle_name, mobile_number, monthly_income, name, passport_number, passport_series, place_of_birth, retired, surname, citizenship, city, marital_status) values ('st. Nemiga 1', '1999-01-01', false, '2005-03-03', '0', 'morozov@gmail.com',     'M', '222222', '5123456F123PB5', 'Minsk ROVD',     'Urievich',    '291234567', 10000, 'Ilya',     '1234567', 'MC', 'Minsk',     false, 'Morozov',     'Belarusian', 'Minsk',     'Single');
insert into client (address, birth_date, bound_to_military_service, date_of_issue, disability, email, gender, home_number, id_number, issued_by, middle_name, mobile_number, monthly_income, name, passport_number, passport_series, place_of_birth, retired, surname, citizenship, city, marital_status) values ('st. Nemiga 2', '1990-02-03', true,  '2007-04-02', '0', 'karpitsky@gmail.com',   'M', '221111', '4123456F123PB5', 'Minsk ROVD',     'Sergeevich',  '292345678', 1,     'Aleksey',  '2345678', 'MC', 'Minsk',     false, 'Karpitsky',   'Belarusian', 'Minsk',     'Single');
insert into client (address, birth_date, bound_to_military_service, date_of_issue, disability, email, gender, home_number, id_number, issued_by, middle_name, mobile_number, monthly_income, name, passport_number, passport_series, place_of_birth, retired, surname, citizenship, city, marital_status) values ('st. Nemiga 3', '1982-03-04', false, '2009-05-04', '0', 'krukovich@gmail.com',   'F', '272688', '3123456F123PB5', 'Soligorsk ROVD', 'Nikolayevna', '293456789', 10000, 'Polina',   '3456789', 'MC', 'Soligorsk', false, 'Krukovich',   'Belarusian', 'Soligorsk', 'Married');
insert into client (address, birth_date, bound_to_military_service, date_of_issue, disability, email, gender, home_number, id_number, issued_by, middle_name, mobile_number, monthly_income, name, passport_number, passport_series, place_of_birth, retired, surname, citizenship, city, marital_status) values ('st. Nemiga 4', '1978-04-06', false, '2012-06-08', '0', 'panamarenka@gmail.com', 'F', '272634', '2123456F123PB5', 'Minsk ROVD',     'Ivanovna',    '294567890', 10000, 'Svetlana', '4567890', 'MC', 'Minsk',     false, 'Panamarenka', 'Belarusian', 'Minsk',     'Single');
insert into client (address, birth_date, bound_to_military_service, date_of_issue, disability, email, gender, home_number, id_number, issued_by, middle_name, mobile_number, monthly_income, name, passport_number, passport_series, place_of_birth, retired, surname, citizenship, city, marital_status) values ('st. Nemiga 5', '1992-05-08', false, '2015-07-09', '0', 'petrov@gmail.com',      'M', '212345', '1123456F123PB5', 'Minsk ROVD',     'Dmitrievich', '295678901', 10000, 'Petr',     '5678901', 'MC', 'Minsk',     false, 'Petrov',      'Belarusian', 'Minsk',     'Divorced');


insert into bank_program (type, pay_type, name, currency, percent_rate, min_amount, max_amount, min_period, max_period) values ('Deposit', 'Revocable',   'Vyshe.net', 'USD', 0.01, 100, null, 12, 12);
insert into bank_program (type, pay_type, name, currency, percent_rate, min_amount, max_amount, min_period, max_period) values ('Deposit', 'Irrevocable', '5 Stars',   'USD', 0.01, 100, null, 30, 30);
insert into bank_program (type, pay_type, name, currency, percent_rate, min_amount, max_amount, min_period, max_period) values ('Deposit', 'Revocable',   'Hot Money', 'USD', 0.01, 1,   null, 3,  3);

insert into bank_program (type, pay_type, name, currency, percent_rate, min_amount, max_amount, min_period, max_period) values ('Deposit', 'Irrevocable', 'Vyshe.net', 'BYN', 18.5, 100, null, 2,  24);
insert into bank_program (type, pay_type, name, currency, percent_rate, min_amount, max_amount, min_period, max_period) values ('Deposit', 'Revocable',   'Vyshe.net', 'BYN', 11.0, 100, null, 2,  18);
insert into bank_program (type, pay_type, name, currency, percent_rate, min_amount, max_amount, min_period, max_period) values ('Deposit', 'Revocable',   '5 Stars',   'BYN', 11.0, 100, null, 2,  18);
insert into bank_program (type, pay_type, name, currency, percent_rate, min_amount, max_amount, min_period, max_period) values ('Deposit', 'Irrevocable', '5 Stars',   'BYN', 18.5, 100, null, 2,  24);
insert into bank_program (type, pay_type, name, currency, percent_rate, min_amount, max_amount, min_period, max_period) values ('Deposit', 'Revocable',   'Hot Money', 'BYN', 3.0,  1,   null, 3,  3);

insert into bank_program (type, pay_type, name, currency, percent_rate, min_amount, max_amount, min_period, max_period) values ('Deposit', 'Revocable',   'Vyshe.net', 'EUR', 0.01, 100, null, 12, 12);
insert into bank_program (type, pay_type, name, currency, percent_rate, min_amount, max_amount, min_period, max_period) values ('Deposit', 'Revocable',   'Hot Money', 'EUR', 0.01, 1,   null, 3,  3);

insert into bank_program (type, pay_type, name, currency, percent_rate, min_amount, max_amount, min_period, max_period) values ('Credit', 'Annuity', 'Universal Credit',  'BYN', 24,    1,     17400,  1,   60);
insert into bank_program (type, pay_type, name, currency, percent_rate, min_amount, max_amount, min_period, max_period) values ('Credit', 'Annuity', 'Electronic Credit', 'BYN', 18,    1500,  1500,   60,  60);
insert into bank_program (type, pay_type, name, currency, percent_rate, min_amount, max_amount, min_period, max_period) values ('Credit', 'Annuity', 'Best Shopping',     'BYN', 18,    160,   4500,   6,   6);
insert into bank_program (type, pay_type, name, currency, percent_rate, min_amount, max_amount, min_period, max_period) values ('Credit', 'Annuity', 'Just Shopping',     'BYN', 24,    1,     24900,  1,   60);
insert into bank_program (type, pay_type, name, currency, percent_rate, min_amount, max_amount, min_period, max_period) values ('Credit', 'Annuity', 'Just Auto',         'BYN', 24,    1,     24900,  1,   84);
insert into bank_program (type, pay_type, name, currency, percent_rate, min_amount, max_amount, min_period, max_period) values ('Credit', 'Annuity', 'New Auto',          'BYN', 24,    9900,  124300, 60,  60);

insert into bank_program (type, pay_type, name, currency, percent_rate, min_amount, max_amount, min_period, max_period) values ('Credit', 'Differentiated', 'Dream Apartment',   'BYN', 10.75, 10000, 373500, 240, 240);


insert into account (account_number, activity, type) values ('1111111111111', 'Passive', 'Bank');

insert into account_transaction (credit, currency, debit, transaction_reason, account_id) values (1000000, 'USD', 0, 'Initial Amount', 1);
insert into account_transaction (credit, currency, debit, transaction_reason, account_id) values (1000000, 'BYN', 0, 'Initial Amount', 1);
insert into account_transaction (credit, currency, debit, transaction_reason, account_id) values (1000000, 'EUR', 0, 'Initial Amount', 1);

