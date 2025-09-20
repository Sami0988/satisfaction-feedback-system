--
-- PostgreSQL database dump
--

\restrict 8tNC0rTQ7ojy1dMIzFJ07i75UT98sLK1B5cyhh8bhze5EThyurOQj2pTXa2MNiP

-- Dumped from database version 17.6 (Debian 17.6-1.pgdg13+1)
-- Dumped by pg_dump version 17.6 (Debian 17.6-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: app_users; Type: TABLE; Schema: public; Owner:sami
--

CREATE TABLE public.app_users (
    user_id uuid NOT NULL,
    full_name character varying(150) NOT NULL,
    phone character varying(50),
    email character varying(150) NOT NULL,
    user_type character varying(255) NOT NULL,
    national_id character varying(50),
    active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT app_users_user_type_check CHECK (((user_type)::text = ANY ((ARRAY['Citizen'::character varying, 'Employee'::character varying, 'Staff'::character varying])::text[])))
);


ALTER TABLE public.app_users OWNER TO sami;

--
-- Name: cache; Type: TABLE; Schema: public; Owner: sami
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache OWNER TO sami;

--
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: sami
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


ALTER TABLE public.cache_locks OWNER TO sami;

--
-- Name: departments; Type: TABLE; Schema: public; Owner: sami
--

CREATE TABLE public.departments (
    department_id uuid NOT NULL,
    name character varying(150) NOT NULL,
    code character varying(50) NOT NULL,
    email character varying(150),
    phone character varying(50),
    floor character varying(50),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.departments OWNER TO sami;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: sami
--

CREATE TABLE public.employees (
    employee_id uuid NOT NULL,
    full_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(255),
    password character varying(255) NOT NULL,
    role_id uuid,
    department_id uuid,
    service_id uuid,
    hire_date date,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.employees OWNER TO sami;

--
-- Name: feedback_forms; Type: TABLE; Schema: public; Owner: sami
--

CREATE TABLE public.feedback_forms (
    form_id uuid NOT NULL,
    service_id uuid NOT NULL,
    name character varying(150) NOT NULL,
    description text,
    language character varying(20) DEFAULT 'en'::character varying NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.feedback_forms OWNER TO sami;

--
-- Name: feedback_questions; Type: TABLE; Schema: public; Owner: sami
--

CREATE TABLE public.feedback_questions (
    question_id uuid NOT NULL,
    form_id uuid NOT NULL,
    question_text text NOT NULL,
    question_type character varying(50) NOT NULL,
    is_required boolean DEFAULT true NOT NULL,
    display_order integer DEFAULT 0 NOT NULL,
    weight numeric(5,2) DEFAULT '1'::numeric NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.feedback_questions OWNER TO sami;

--
-- Name: feedback_responses; Type: TABLE; Schema: public; Owner: sami
--

CREATE TABLE public.feedback_responses (
    response_id uuid NOT NULL,
    user_id uuid NOT NULL,
    question_id uuid NOT NULL,
    service_id uuid NOT NULL,
    response_text text,
    numeric_value numeric(5,2),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.feedback_responses OWNER TO sami;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: sami
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO sami;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: sami
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO sami;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sami
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: personal_access_tokens; Type: TABLE; Schema: public; Owner: sami
--

CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id uuid NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.personal_access_tokens OWNER TO sami;

--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: sami
--

CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.personal_access_tokens_id_seq OWNER TO sami;

--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sami
--

ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: sami
--

CREATE TABLE public.roles (
    role_id uuid NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.roles OWNER TO sami;

--
-- Name: services; Type: TABLE; Schema: public; Owner: sami
--

CREATE TABLE public.services (
    service_id uuid NOT NULL,
    department_id uuid NOT NULL,
    name character varying(150) NOT NULL,
    category character varying(100),
    description text,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.services OWNER TO sami;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: sami
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


ALTER TABLE public.sessions OWNER TO sami;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: personal_access_tokens id; Type: DEFAULT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);


--
-- Data for Name: app_users; Type: TABLE DATA; Schema: public; Owner: sami
--

COPY public.app_users (user_id, full_name, phone, email, user_type, national_id, active, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: cache; Type: TABLE DATA; Schema: public; Owner: sami
--

COPY public.cache (key, value, expiration) FROM stdin;
\.


--
-- Data for Name: cache_locks; Type: TABLE DATA; Schema: public; Owner: sami
--

COPY public.cache_locks (key, owner, expiration) FROM stdin;
\.


--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: sami
--

COPY public.departments (department_id, name, code, email, phone, floor, created_at, updated_at) FROM stdin;
cf209831-57b3-43d4-b69b-99461e49960c	Finance	DEP-2921BF49	Finanace@gmail.com	097327462332	5	2025-09-19 11:46:26	2025-09-19 11:46:26
86265b88-a81a-4164-8bb4-e8adafd9a63c	Department Two	DEP-1581F704	department4@example.com	0930584510	3	2025-09-19 12:49:28	2025-09-19 12:49:28
129cc5f8-dcbf-4450-9ee7-9347605ab698	ICSMIS	DEP-19E9D764	icmis@gmail.com	098373622	6	2025-09-19 12:50:38	2025-09-19 12:50:38
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: sami
--

COPY public.employees (employee_id, full_name, email, phone, password, role_id, department_id, service_id, hire_date, active, created_at, updated_at) FROM stdin;
f9652b6e-067c-4924-ae40-a9d8e1c910be	John Doe	john@company.com	0912345678	$2y$12$jkvHbXSWFY/zfl5A7gV.b.EVjxhAZnjjHtFMb8K7qmkSwAzWETdpy	5e847d47-2f7a-4f65-86c6-2f95a73a24ac	\N	\N	\N	t	2025-09-19 11:35:09	2025-09-19 11:35:09
d917f652-7f66-4a76-bf05-a5bb55c5b210	Samuel Zelalem	sami@gmial.com	0883284723	$2y$12$cziGmhxnjQuD00WdBvVx8uJXDquNLjAtNQ5rgekJaYHyZJnWCEHha	69bdba12-dc88-450d-b062-3cb7a8968528	cf209831-57b3-43d4-b69b-99461e49960c	\N	\N	t	2025-09-19 11:46:26	2025-09-19 11:46:26
b8de7518-023e-473f-890a-3a87b9d13a08	Samuel Zelalem	samuasami84@gmail.com	0930584110	$2y$12$IOC9e0nxJaKS4LWcUAW0Uer8MyvAPFypnw/N5rL0XtQj2loxJOJBq	69bdba12-dc88-450d-b062-3cb7a8968528	86265b88-a81a-4164-8bb4-e8adafd9a63c	\N	\N	t	2025-09-19 12:49:28	2025-09-19 12:49:28
9152776b-cf94-41f2-81fe-3075d048be5c	Milkesa Abdi	Miki@gmail.com	0982362332	$2y$12$dphikeHAhsjeQN8C1qR.y.Gs5tp5Z9ve9UrAv1sqw2UK21Cf/JSLW	69bdba12-dc88-450d-b062-3cb7a8968528	129cc5f8-dcbf-4450-9ee7-9347605ab698	\N	\N	t	2025-09-19 12:50:38	2025-09-19 12:50:38
\.


--
-- Data for Name: feedback_forms; Type: TABLE DATA; Schema: public; Owner: sami
--

COPY public.feedback_forms (form_id, service_id, name, description, language, active, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: feedback_questions; Type: TABLE DATA; Schema: public; Owner: sami
--

COPY public.feedback_questions (question_id, form_id, question_text, question_type, is_required, display_order, weight, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: feedback_responses; Type: TABLE DATA; Schema: public; Owner: sami
--

COPY public.feedback_responses (response_id, user_id, question_id, service_id, response_text, numeric_value, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: sami
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	2025_08_21_071735_create_departments_table	1
2	2025_08_21_071735_create_services_table	1
3	2025_08_21_071736_create_app_users_table	1
4	2025_08_21_071736_create_feedback_forms_table	1
5	2025_08_21_071736_create_feedback_questions_table	1
6	2025_08_21_071736_create_feedback_responses_table	1
7	2025_08_21_071736_create_roles_table	1
8	2025_08_21_071907_create_sessions_table	1
9	2025_08_25_071858_add_password_to_app_users_table	1
10	2025_08_27_103751_create_personal_access_tokens_table	1
11	2025_09_01_071439_create_employee_table	1
12	2025_09_01_073535_drop_user_roles_table	1
13	2025_09_15_124322_create_cache_table	1
\.


--
-- Data for Name: personal_access_tokens; Type: TABLE DATA; Schema: public; Owner: sami
--

COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) FROM stdin;
1	App\\Models\\Employee	f9652b6e-067c-4924-ae40-a9d8e1c910be	auth_token	a654ac9075dd81a493391acd5052f4bd2dad2cf7e7008bfa0fa4d05a8b5bf3cb	["*"]	\N	\N	2025-09-19 11:35:16	2025-09-19 11:35:16
3	App\\Models\\Employee	f9652b6e-067c-4924-ae40-a9d8e1c910be	auth_token	256e14506d095433adeb796ecc8fbf0ec82e517ce69db4a71de7a818ce537368	["*"]	2025-09-19 11:46:29	\N	2025-09-19 11:42:38	2025-09-19 11:46:29
4	App\\Models\\Employee	f9652b6e-067c-4924-ae40-a9d8e1c910be	auth_token	965eb6b34466fb8ed877656246964f33ef6589912095fa5b4ffe50ac3251fd4c	["*"]	2025-09-19 12:26:55	\N	2025-09-19 11:56:52	2025-09-19 12:26:55
6	App\\Models\\Employee	f9652b6e-067c-4924-ae40-a9d8e1c910be	auth_token	0303e69ba061f9bed882e92b90cd1bea94e1d7eff1dc8e6fb6702ddc09980bbf	["*"]	2025-09-19 12:49:27	\N	2025-09-19 12:48:48	2025-09-19 12:49:27
5	App\\Models\\Employee	f9652b6e-067c-4924-ae40-a9d8e1c910be	auth_token	89e224d90d4ce281df92f1daee63268e4534725ab162b3984ee041afe43c773d	["*"]	2025-09-19 12:50:50	\N	2025-09-19 12:15:20	2025-09-19 12:50:50
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: sami
--

COPY public.roles (role_id, name, description, created_at, updated_at) FROM stdin;
5e847d47-2f7a-4f65-86c6-2f95a73a24ac	Super Admin	Full access to the system	2025-09-19 11:35:09	2025-09-19 11:35:09
69bdba12-dc88-450d-b062-3cb7a8968528	Department Admin	Admin for department	2025-09-19 11:46:26	2025-09-19 11:46:26
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: sami
--

COPY public.services (service_id, department_id, name, category, description, active, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: sami
--

COPY public.sessions (id, user_id, ip_address, user_agent, payload, last_activity) FROM stdin;
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sami
--

SELECT pg_catalog.setval('public.migrations_id_seq', 13, true);


--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sami
--

SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 6, true);


--
-- Name: app_users app_users_email_unique; Type: CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.app_users
    ADD CONSTRAINT app_users_email_unique UNIQUE (email);


--
-- Name: app_users app_users_pkey; Type: CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.app_users
    ADD CONSTRAINT app_users_pkey PRIMARY KEY (user_id);


--
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (department_id);


--
-- Name: employees employees_email_unique; Type: CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_unique UNIQUE (email);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (employee_id);


--
-- Name: feedback_forms feedback_forms_pkey; Type: CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.feedback_forms
    ADD CONSTRAINT feedback_forms_pkey PRIMARY KEY (form_id);


--
-- Name: feedback_questions feedback_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.feedback_questions
    ADD CONSTRAINT feedback_questions_pkey PRIMARY KEY (question_id);


--
-- Name: feedback_responses feedback_responses_pkey; Type: CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.feedback_responses
    ADD CONSTRAINT feedback_responses_pkey PRIMARY KEY (response_id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: personal_access_tokens personal_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);


--
-- Name: personal_access_tokens personal_access_tokens_token_unique; Type: CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);


--
-- Name: roles roles_name_unique; Type: CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_unique UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (service_id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: app_users_active_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX app_users_active_index ON public.app_users USING btree (active);


--
-- Name: app_users_email_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX app_users_email_index ON public.app_users USING btree (email);


--
-- Name: app_users_national_id_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX app_users_national_id_index ON public.app_users USING btree (national_id);


--
-- Name: app_users_user_type_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX app_users_user_type_index ON public.app_users USING btree (user_type);


--
-- Name: departments_code_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX departments_code_index ON public.departments USING btree (code);


--
-- Name: departments_name_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX departments_name_index ON public.departments USING btree (name);


--
-- Name: employees_department_id_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX employees_department_id_index ON public.employees USING btree (department_id);


--
-- Name: employees_service_id_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX employees_service_id_index ON public.employees USING btree (service_id);


--
-- Name: feedback_forms_service_id_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX feedback_forms_service_id_index ON public.feedback_forms USING btree (service_id);


--
-- Name: feedback_questions_display_order_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX feedback_questions_display_order_index ON public.feedback_questions USING btree (display_order);


--
-- Name: feedback_questions_form_id_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX feedback_questions_form_id_index ON public.feedback_questions USING btree (form_id);


--
-- Name: feedback_questions_question_type_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX feedback_questions_question_type_index ON public.feedback_questions USING btree (question_type);


--
-- Name: feedback_responses_created_at_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX feedback_responses_created_at_index ON public.feedback_responses USING btree (created_at);


--
-- Name: feedback_responses_question_id_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX feedback_responses_question_id_index ON public.feedback_responses USING btree (question_id);


--
-- Name: feedback_responses_service_id_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX feedback_responses_service_id_index ON public.feedback_responses USING btree (service_id);


--
-- Name: feedback_responses_user_id_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX feedback_responses_user_id_index ON public.feedback_responses USING btree (user_id);


--
-- Name: personal_access_tokens_expires_at_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX personal_access_tokens_expires_at_index ON public.personal_access_tokens USING btree (expires_at);


--
-- Name: personal_access_tokens_tokenable_type_tokenable_id_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);


--
-- Name: roles_name_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX roles_name_index ON public.roles USING btree (name);


--
-- Name: services_category_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX services_category_index ON public.services USING btree (category);


--
-- Name: services_department_id_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX services_department_id_index ON public.services USING btree (department_id);


--
-- Name: services_name_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX services_name_index ON public.services USING btree (name);


--
-- Name: sessions_last_activity_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);


--
-- Name: sessions_user_id_index; Type: INDEX; Schema: public; Owner: sami
--

CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);


--
-- Name: employees employees_department_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_department_id_foreign FOREIGN KEY (department_id) REFERENCES public.departments(department_id) ON DELETE SET NULL;


--
-- Name: employees employees_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(role_id) ON DELETE SET NULL;


--
-- Name: employees employees_service_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_service_id_foreign FOREIGN KEY (service_id) REFERENCES public.services(service_id) ON DELETE SET NULL;


--
-- Name: feedback_forms feedback_forms_service_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.feedback_forms
    ADD CONSTRAINT feedback_forms_service_id_foreign FOREIGN KEY (service_id) REFERENCES public.services(service_id) ON DELETE CASCADE;


--
-- Name: feedback_questions feedback_questions_form_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.feedback_questions
    ADD CONSTRAINT feedback_questions_form_id_foreign FOREIGN KEY (form_id) REFERENCES public.feedback_forms(form_id) ON DELETE CASCADE;


--
-- Name: feedback_responses feedback_responses_question_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.feedback_responses
    ADD CONSTRAINT feedback_responses_question_id_foreign FOREIGN KEY (question_id) REFERENCES public.feedback_questions(question_id) ON DELETE CASCADE;


--
-- Name: feedback_responses feedback_responses_service_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.feedback_responses
    ADD CONSTRAINT feedback_responses_service_id_foreign FOREIGN KEY (service_id) REFERENCES public.services(service_id) ON DELETE CASCADE;


--
-- Name: feedback_responses feedback_responses_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.feedback_responses
    ADD CONSTRAINT feedback_responses_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.app_users(user_id) ON DELETE CASCADE;


--
-- Name: services services_department_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: sami
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_department_id_foreign FOREIGN KEY (department_id) REFERENCES public.departments(department_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 8tNC0rTQ7ojy1dMIzFJ07i75UT98sLK1B5cyhh8bhze5EThyurOQj2pTXa2MNiP

