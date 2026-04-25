--
-- PostgreSQL database dump
--

\restrict ePa4bnGGmIVjHr351uS7wp3G7hoRehNJhstNDH9PHCVWGyWaPs2bTggKMWT6ZeM

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

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
-- Name: batches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.batches (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    batch_code character varying(50) NOT NULL,
    course_id uuid,
    trainer_id uuid,
    start_date date NOT NULL,
    status character varying(20) DEFAULT 'PLANNED'::character varying,
    mode character varying(20) DEFAULT 'ONLINE'::character varying
);


ALTER TABLE public.batches OWNER TO postgres;

--
-- Name: corporates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.corporates (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    company_name character varying(255) NOT NULL,
    lead_status character varying(20) DEFAULT 'COLD'::character varying,
    proposal_url text
);


ALTER TABLE public.corporates OWNER TO postgres;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    duration_hours integer NOT NULL,
    fee numeric NOT NULL,
    min_attendance integer DEFAULT 75
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- Name: enrollments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enrollments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid,
    batch_id uuid,
    payment_status character varying(20) DEFAULT 'PENDING'::character varying,
    feedback_progress integer DEFAULT 0
);


ALTER TABLE public.enrollments OWNER TO postgres;

--
-- Name: feedbacks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feedbacks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    enrollment_id uuid,
    checkpoint integer NOT NULL,
    rating integer,
    comments text
);


ALTER TABLE public.feedbacks OWNER TO postgres;

--
-- Name: finance_audit_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.finance_audit_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    action character varying(50) NOT NULL,
    entity character varying(50) NOT NULL,
    entity_id uuid NOT NULL,
    details text,
    performed_by uuid,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.finance_audit_logs OWNER TO postgres;

--
-- Name: finance_bank_records; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.finance_bank_records (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    entry_type character varying(50) NOT NULL,
    bank_name character varying(255),
    account_no character varying(50),
    amount numeric NOT NULL,
    description text,
    reference character varying(255),
    valid_from timestamp without time zone,
    valid_until timestamp without time zone,
    status character varying(20) DEFAULT 'ACTIVE'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.finance_bank_records OWNER TO postgres;

--
-- Name: finance_budgets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.finance_budgets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    vertical character varying(50) NOT NULL,
    financial_year character varying(20) NOT NULL,
    allocated numeric DEFAULT 0,
    used numeric DEFAULT 0,
    released numeric DEFAULT 0,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.finance_budgets OWNER TO postgres;

--
-- Name: finance_donor_funds; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.finance_donor_funds (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    donor_name character varying(255) NOT NULL,
    donor_type character varying(50) DEFAULT 'INDIVIDUAL'::character varying,
    amount numeric NOT NULL,
    vertical character varying(50),
    project character varying(255),
    purpose text,
    reference character varying(255),
    received_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.finance_donor_funds OWNER TO postgres;

--
-- Name: finance_requisitions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.finance_requisitions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    vertical character varying(50) NOT NULL,
    amount numeric NOT NULL,
    purpose text NOT NULL,
    description text,
    financial_year character varying(20) NOT NULL,
    status character varying(20) DEFAULT 'PENDING'::character varying,
    rejection_note text,
    approved_amount numeric,
    released_amount numeric,
    raised_by_id uuid,
    approved_by_id uuid,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.finance_requisitions OWNER TO postgres;

--
-- Name: finance_salaries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.finance_salaries (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    employee_type character varying(50) NOT NULL,
    employee_name character varying(255) NOT NULL,
    vertical character varying(50),
    amount numeric NOT NULL,
    month character varying(20) NOT NULL,
    status character varying(20) DEFAULT 'PENDING'::character varying,
    payment_date timestamp without time zone,
    reference character varying(255),
    commission numeric,
    user_id uuid,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.finance_salaries OWNER TO postgres;

--
-- Name: finance_transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.finance_transactions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    transaction_type character varying(50) NOT NULL,
    source character varying(50) NOT NULL,
    amount numeric NOT NULL,
    description text,
    reference character varying(255),
    status character varying(20) DEFAULT 'SUCCESS'::character varying,
    user_id uuid,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.finance_transactions OWNER TO postgres;

--
-- Name: finance_utilisations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.finance_utilisations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    requisition_id uuid,
    vertical character varying(50) NOT NULL,
    amount numeric NOT NULL,
    description text,
    bill_no character varying(100),
    status character varying(20) DEFAULT 'PENDING'::character varying,
    rejection_note text,
    submitted_by_id uuid,
    verified_by_id uuid,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.finance_utilisations OWNER TO postgres;

--
-- Name: lessons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lessons (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    batch_id uuid,
    topic_name character varying(255) NOT NULL,
    teacher_id uuid,
    scheduled_at timestamp without time zone
);


ALTER TABLE public.lessons OWNER TO postgres;

--
-- Name: memberships; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.memberships (
    id integer NOT NULL,
    tier_name character varying(50) NOT NULL,
    coin_multiplier numeric DEFAULT 1.0,
    initial_coins integer DEFAULT 0
);


ALTER TABLE public.memberships OWNER TO postgres;

--
-- Name: memberships_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.memberships_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.memberships_id_seq OWNER TO postgres;

--
-- Name: memberships_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.memberships_id_seq OWNED BY public.memberships.id;


--
-- Name: mentorship_slots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mentorship_slots (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    mentor_id uuid,
    student_id uuid,
    scheduled_time timestamp without time zone,
    is_paid boolean DEFAULT false
);


ALTER TABLE public.mentorship_slots OWNER TO postgres;

--
-- Name: partners; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partners (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    zone_id integer,
    commission_rate numeric DEFAULT 10.0,
    revenue_share_config jsonb
);


ALTER TABLE public.partners OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: skill_coin_transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skill_coin_transactions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid,
    amount numeric NOT NULL,
    activity_type character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.skill_coin_transactions OWNER TO postgres;

--
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    aadhaar_hash text NOT NULL,
    student_tag_id character varying(50) NOT NULL,
    category character varying(10) NOT NULL,
    skill_coin_balance numeric DEFAULT 0,
    total_skill_score integer DEFAULT 0,
    membership_id integer,
    name text
);


ALTER TABLE public.students OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying(255) NOT NULL,
    mobile character varying(15) NOT NULL,
    password_hash text NOT NULL,
    role_id integer,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    category character varying(20) DEFAULT 'DIR'::character varying,
    status character varying(50) DEFAULT 'active'::character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: memberships id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.memberships ALTER COLUMN id SET DEFAULT nextval('public.memberships_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Data for Name: batches; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.batches (id, batch_code, course_id, trainer_id, start_date, status, mode) FROM stdin;
1416a614-d259-4133-bae3-5c500e272607	FUL-B01	8a87b4da-96b0-4600-96dd-a4f16fb6170a	\N	2026-05-04	PLANNED	Hybrid
e774e5cc-3832-4bcf-be76-2ffea4f46eb0	CYB-B01	a795a913-ebd9-4218-bed4-a2793d7fbfa0	\N	2026-05-04	PLANNED	Hybrid
96f3b285-5fe4-4ae0-b4a5-cc9aa629f19d	DAT-B01	54692ba2-62c5-465d-8989-74dd47caab39	\N	2026-05-04	PLANNED	Hybrid
4b3ce57b-e470-4950-8f6a-a083910c485f	BATCH-AI-524	4d9d2609-bb1c-4ac4-988a-6474c4b5c5ec	\N	2026-05-01	PLANNED	ONLINE
0fea89e9-586f-481d-bb34-e5010244902a	BATCH-AI-423	e6b2f761-05ee-460a-8b66-93fed5d83ed4	\N	2026-05-01	PLANNED	ONLINE
864b011f-42b1-44d2-91de-0ef9e6b2b597	B-2026-PYTHON-01	be82f316-2d9c-4ff7-874f-567479ed99c8	\N	2026-04-25	ACTIVE	ONLINE
\.


--
-- Data for Name: corporates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.corporates (id, company_name, lead_status, proposal_url) FROM stdin;
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (id, title, duration_hours, fee, min_attendance) FROM stdin;
8a87b4da-96b0-4600-96dd-a4f16fb6170a	Full Stack Development	120	15000	75
a795a913-ebd9-4218-bed4-a2793d7fbfa0	Cyber Security	80	20000	75
54692ba2-62c5-465d-8989-74dd47caab39	Data Analytics	60	10000	75
4c8ab0f0-9d83-4e49-a19c-d20a5bd39bf7	Full Stack Development	120	15000	75
a37e1db8-1098-448d-ae0b-86d41054df3d	Cyber Security	80	20000	75
b005143d-009e-444e-ae7a-d8a5546b28cd	Data Analytics	60	10000	75
a49f1b5a-2ade-4dfd-853d-02b5315cae57	Full Stack Development	120	15000	75
4c80d139-add8-45b7-ab85-50dfcf935c69	Cyber Security	80	20000	75
45ebef43-2488-4a70-9d73-4547822b660d	Data Analytics	60	10000	75
4d9d2609-bb1c-4ac4-988a-6474c4b5c5ec	Advanced Robotics & AI	120	15000	75
e6b2f761-05ee-460a-8b66-93fed5d83ed4	Advanced Robotics & AI	120	15000	75
be82f316-2d9c-4ff7-874f-567479ed99c8	Python Full Stack Development	120	15000	75
\.


--
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.enrollments (id, student_id, batch_id, payment_status, feedback_progress) FROM stdin;
0d17a222-b2b8-4721-8b84-c769c7a5081f	3920645c-bb6e-4869-a351-2d314aafdf1a	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
902c8de1-c53c-4b83-86aa-17fde0f950fe	e37ed4b9-c3a1-4686-a6ee-7d886235f516	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
0d764328-1df9-4c10-b25c-2fc2a86bf75e	0e9fa867-cd3f-4cd7-8900-813d895ca347	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
81608443-330a-45d1-b540-a345005a2040	313560f2-1180-45f9-9f98-d5358ac2cb7a	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
f8f1dc21-09f7-4eb4-97ee-311b7bba86c8	3642a8b8-ec7e-42b2-b2ea-d70e05b76242	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
ed9ce53f-589f-4c69-892a-af324da5d3ab	00975aa8-f168-4f4d-b981-6c4809de4b8f	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
aa7e1e51-3863-4fab-9f0a-804dc25d6e27	670ed33c-f5d7-4dc1-8531-d973bde371e2	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
f28e07ca-6f79-4559-8533-756a0c26cc6c	6daa8145-400c-479a-a017-53229ab64d36	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
f86e5606-bccc-4b45-9783-cf147f5c0ca2	6f7e6298-4009-4f5f-b64b-acd49fd588fa	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
9cdaffe6-65db-4f70-a7bc-2bec257211a7	3b042ca0-89ad-4b0a-809b-1229a599e5fe	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
371eb410-ffe6-48bc-8d1b-5f5a2f1f5527	68998eae-e058-4eb4-b8c4-95c489dd7312	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
65250f9b-42da-4c67-9a18-28241f43119f	d8b98ca8-11bd-44b6-b450-eee53f2492f2	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
22abf6ea-a660-4cca-8fb2-acfc393d26a4	7b6c66cd-6e82-4f34-8afe-c4ad11251daf	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
ef8df171-e6d3-47a1-a552-65d9d8ef2491	5088a1fa-d8a0-403e-adf6-fafcda1c3f38	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
1e31c9e6-54eb-4dc6-94f7-7b9a284d71a4	dda2cece-bd52-461c-ad36-9561f574d22d	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
e9497282-da49-4ab6-b124-101dff9cd5e7	a4b7b2f3-a3ec-484e-ad17-48b7e8c9cb77	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
480b0acb-be7a-4263-af8c-73319dbcfb72	98a83a2e-bd22-4b23-ba8c-887925a79c27	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
a3c1a161-2659-4e42-9cb0-6ef5593dd558	c31f5a59-5c45-48a3-b628-8b05b71a322e	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
df64dbb6-b132-4229-8361-1d8764949290	7a7d4bd9-c0c8-48e1-8551-ea6c938ca603	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
e251827b-efcd-4f15-b199-cd5164755cbe	a38a2b48-c66d-4580-b153-f3aa1939153c	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
d5bd27fc-dcdf-4b5c-97f0-77032dae05b5	8bce3a9b-53a0-44a0-9d3a-72de7efbf9ce	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
3d9ec463-a1e5-4c22-a9db-53658bcefe69	a287270f-90b8-4217-a127-a054c298050b	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
32f67fcf-52bd-44c7-a92c-3617c0626f45	f3f7da1b-7527-4d6b-bd8c-876327128bd9	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
d40a8740-ea3a-4adf-82d7-ba2fa7896c63	20a1d333-efdf-4e84-adfb-da5a82d6f51d	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
214f0f19-6d57-407f-b041-75f4d6cab8d7	01cb9089-7777-4804-b56d-02009dbfe4ef	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
395f866b-11e7-409e-b9ea-221b1710c2c2	8239ccf7-a307-4521-8620-05e081ee75c2	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
19dd9dec-a732-40ac-9659-f31387c51345	a491ceda-bce1-467c-b8aa-73e6e1f7a846	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
3d90d323-e54c-49e0-a243-49a947c63048	4a43e8d0-0a0a-4754-80fe-239390d6986e	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
37469a70-3e71-47b6-8b2d-b12890ce7c49	3b3f7658-e676-4b7f-9230-d1c060b859fa	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
7fd29dfd-bf6e-4692-892c-3453f564e276	262c3ec5-f944-4d4b-83aa-eb8cca2b9023	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
d7dd52bd-7d63-4bd2-9b37-ab537c8cdb0a	bcf5d602-6055-4d16-b22d-1850a3dae2c6	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
07ed6405-8ec0-4e8e-bbd2-37f3cdf15a8a	44143488-0098-4803-993f-e3beb0bd574f	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
886be30a-b6a3-4f3d-88a7-8995f2e1d18b	e2f32a16-2707-4816-97da-60b72cad2974	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
0b259c6d-c1e2-48af-9ad8-b434f0861d12	dedf8ae2-1e1f-40f3-86a4-0209e27c6d53	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
9e9273ea-a3fc-498b-9bd8-5ef1105fed9d	8cd22304-0410-43ad-8359-040abb1c3ec9	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
0af7510f-9a90-4cca-93be-73fa54f7a408	b593b12a-c44c-4e71-bbee-586fbb0892cf	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
ef0c055a-a8ca-4a4a-b3e7-f0344f8b6733	88906ba4-f2a9-496f-84db-0f0601d0e01a	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
29c0ea4e-39f6-4cdf-9213-0b7d59fec628	19728a2e-2e8b-4314-952d-56cf1ea4e1b5	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
1a697748-f0ba-4160-b3a2-1a521002873c	f317d034-47be-4966-89ab-35646936589e	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
7a13a6c3-76d1-4823-bb84-e955bef3f55d	6f9d061b-79b3-4cb8-a625-43b1368d8fb6	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
3600f31a-46bc-4d92-bcca-fecdd62b3710	0cf27a2a-0c0a-4938-8cf7-819f54c64884	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
19d5c65e-fcca-4f53-92db-138f5fcfd12d	b78472e8-287c-4efb-8ecd-5c0b18a93ac3	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
bc125aae-18cb-4319-8830-4f0adfe68733	0b23d3b9-701b-4f1b-ba3f-1c1c9a03b59d	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
f00a6b6b-e072-479d-b239-6ec1a8cc7448	faa03e9f-5a92-4828-983e-238db36fdbc4	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
8f36d176-0090-470d-b395-dc7fdb2227e6	19087c60-0163-400f-8109-0542b4ffdd23	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
b7367ce3-4d62-40d9-9d07-6bc619059908	cc6c551e-4e0f-4039-ad6e-a8e75d0e2bba	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
43812988-fc16-4a18-b9ec-e1138072cc2d	3e8af8a0-e977-4c4e-821b-8ac5b2382a0c	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
dd6bd20b-a33e-434e-b33c-8d559df3d77c	2f65a29c-e043-4ffc-94d9-8e6a28319b45	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
43916f9b-e588-41cc-ad85-7dcc3f7ef7d4	9d82131f-12fe-45c5-8c1c-2ef452aa7c03	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
92cc682f-1700-476f-bd7a-4b97e09dbb4b	fdbe6d95-d98a-49b7-a3f5-a61c9109fe71	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
3f13ac69-13a0-4221-8e30-f1d47f6eac46	0145785f-89c1-47d9-9b5c-9fdb37616763	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
3ab66581-7d03-40a0-b411-9d5874de798c	6daf9ad6-42ef-4079-9944-9c5da035a43e	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
5b8f2b04-12b5-4fc7-b094-756e0c454934	3919c739-2e33-4750-8edb-a0ed72c678c2	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
2902be6c-3a11-4fbb-ae4e-6157424cdc2d	3291347f-15e0-41a6-b9d9-c7577f7a785c	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
41d9bfa0-c7cc-4d23-9bc0-387fe94dd7ca	953b3b47-01d4-43ec-8b43-b505080138ce	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
5451224c-2c14-4f57-b9ef-cefa1f80656a	3c9696fb-3df9-46e4-888e-aa485be63624	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
ab888ffb-d546-4102-b483-72aa29f493cb	cc79214c-34c6-442e-8f15-fe1a770135dc	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
1a67da10-ffd8-4397-9736-0e4023597ab6	92ab585c-ab3b-4b52-a51e-a71058a4c076	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
71c224b8-1ac0-4d8a-a1f1-b79ee5eb3fcf	869a03ba-a1cc-4775-8b49-1c5fb710806b	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
0c12cb33-59c8-4718-abb5-77d92e808ab2	ee50a453-ccde-45d4-9bcb-d6dc7f3fdd62	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
77ad643c-2bef-46dc-bbcf-b98f9766c96c	1acb9752-2cbb-4671-a86b-c798149890c2	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
2338485c-41c8-4cb7-bf5e-438e77398e0a	ce8a232e-4426-4304-bc2f-101c7857edf1	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
584089ee-5101-4872-81fa-18eb720cd537	5f8fb344-e90d-4f68-86c6-5ba402d69db3	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
4c87097f-808a-4344-943e-fff503656474	3f9ac085-8993-45aa-8a51-8d08193b31c7	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
507fc55f-6c1c-4995-9e60-d055a3c45573	4d54272b-c029-4107-89f3-8d68ead6f5f1	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
350d0d25-9939-40aa-8b65-e4d482570c89	dc66fd31-8216-479e-a667-08a607cc837c	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
4535e02c-4c2f-421d-94c3-d0ec9f2e368e	0dc9924e-f726-4d25-9679-d550a69e84fc	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
ac2c8f10-95a4-4f0b-80a2-cad256c20ed5	4b05fa05-3878-450c-98d9-7db0e5542493	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
f98b5fe6-ff35-4371-a5ec-e0148c05ffe6	7cdc1e90-af7e-43ac-9f68-30a69096250b	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
35a796c7-8065-4ee1-b430-f71412d4292d	0c71684d-ae0d-4c89-86b7-653bc5fbe011	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
30e336fb-3958-4807-b05f-10019375180b	5c4b6e49-b0d1-41d2-b810-5a8bbe525fc5	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
f4a2c05a-3ce8-4186-82e7-41e06b22d8c4	29fa51f5-64f8-4d2e-8e05-6857916adbd1	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
7bfe5fbf-5a28-4569-b886-8a43b8720cfe	08b57c14-154f-4810-a72e-47c8667bcc57	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
432ee156-7da3-486f-be31-2c93bf36414b	4581aaf0-8df2-4022-841e-d3e816e9f377	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
303140d8-3874-4cb8-bf5f-507b0ba93ae6	82e67dcf-5186-426c-a987-3f2cd0c4b0e5	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
01bcb09c-73e7-4243-93c8-f89006bfadc5	73725c32-13f2-4f6b-99e2-97d066670a2d	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
06a59e90-cc16-4406-867c-9ed0afcff1b2	86520640-ce84-4852-bd0e-b85e4ce96216	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
bfd909a0-66f2-4fdc-96e9-d48908ade9ab	bcafd83f-011b-4fa2-a0a2-1bd813a5ad23	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
027b7762-ab8a-4e14-8f12-19144706699c	b423e89c-2a1e-453e-9246-7293cc513f73	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
6c2334ff-9701-421e-a779-70f7870bfed4	795bbc94-cee4-4784-84df-0cdf1cef2839	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
9467500a-a902-49d1-ac3d-660fb8846fa7	6c2cf5f7-548b-4114-a5bf-bba8cd6d8d01	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
9a90e335-97a0-4c0e-a650-61e8efd8a989	43f77212-0519-495b-b2dc-2976bf91811b	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
5b74ea04-e9b4-4504-9057-9bfd12d6f265	1aeb0157-bad2-4c1d-9933-d95250811101	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
e8dd88a5-4c1c-4bcf-a4a5-5ea65bdadfb7	d463c75f-7c48-4460-ac83-00fc95192928	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
0845ab3b-496e-4a06-8adf-1dfd13f9f4bf	addc40b5-ab7f-4fce-8813-e5c9defa4ead	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
898c6e5b-d81d-45c0-8b33-b17363110061	b267d6e9-9a39-497b-ad5c-d2a51edcf0ce	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
def6f199-9ee9-446a-adc8-c2366ec2a8ba	af9d0221-2429-4edf-99e3-3d66a16d1fd0	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
bb98c381-6802-4ea4-9d84-a3422428af0c	d540671c-012b-4e58-b955-3a125fb5c6d5	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
b41dcce9-7495-4348-84fd-75b3795c60e1	be9775a5-9479-493d-beb9-06649cfc4f3a	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
349f0464-765a-4177-a842-dcb82cbe7e35	dd19d386-2715-41c4-945c-f9434827a195	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
fe779cf9-d4a8-4cdc-b1b9-624218808c83	bd6355a6-84aa-4674-ac3d-d41d6d42cde1	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
c5df1929-4a65-41ef-8d45-6d94012b2336	2069c715-ddda-490a-800f-771abffa31d5	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
1ee17525-0a31-4fcb-8cfc-194dd8658103	0060e28f-0da9-47c2-ac55-410dfe7d0b15	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
c1c760a8-2299-46fd-b37c-9eecc90084ae	99c86e6d-73c0-4fce-a9e0-26f5968805a9	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
72351a27-9bdb-4789-9030-1614a3fddee6	a0030756-32f0-4912-b971-7a993b630a57	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
ae2e8e7a-5a07-445b-8e4b-e8256a22c535	9a46ee2a-dbe3-486a-acaf-35c81bf293bb	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
8b79fb82-5bf3-42b4-8720-e30596d993e1	46821f57-8ada-4236-adde-fcda02e64be0	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
6bacd35d-cf70-4ee2-b960-f851f8e8a235	03ae4485-8ca6-4788-a4ce-59baf1fc011c	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
91a7df86-2c9b-40ff-9e8b-80b673a90cec	cf2767f4-ec45-43bd-b709-190396cd0c15	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
75437989-4e4b-4575-ac2e-0322990bb5a2	b355d16a-a577-4f95-80f3-a80619fde9bc	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
be63ef57-df4a-4609-8b76-b048eec25914	833208b7-e453-48be-8166-639aceb76555	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
fcdb6f1d-2216-4e7a-a863-389819ef69bf	89a8d73c-f60e-4968-a584-14f0065effda	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
6be2b5d5-23af-4bf8-8208-6038582d9e09	0535c58b-525e-4c27-8a26-92cac4f12e7b	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
e78dba35-0758-49e8-b58f-1f7210245346	1c0c5015-2fee-4519-9b39-d772d4b466ac	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
5fefa8b6-4787-4c4c-89b7-6b929717e026	93a13b3e-bf5a-4e1a-8b35-329e37d102f7	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
f10551c0-ae8c-4525-8196-ae13b0bd0777	ccbdb7f2-9369-4cbc-8c6e-74ad6d1e123b	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
6a9afa52-29c2-453e-b0e8-c745877f034d	9b85752b-c536-4211-b2b5-13232ea31c5b	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
5aee6453-e152-4580-9dc4-db6892c9a7d1	2897e940-1b00-4316-bd6c-ade5ef0844d0	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
5845626f-307e-42bc-b11a-85e4f6de9e12	3cea3805-e011-4215-a97c-683ff15aa5d1	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
f6f72b3e-8103-43fa-9e77-8956eaa4b565	b0812e78-74cd-406d-a3b1-0ae95f770c9a	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
7b59611a-faa1-49cb-9d51-029567a35a44	0e909863-37c0-46ca-be9e-5fda9e4edaea	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
77f1fb23-0ba6-437c-a474-6fff5cd867ce	b988c817-e0a5-4688-93b3-a250c0bd35cd	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
512339df-699e-41bd-ac9a-7507434550f5	75929eab-9107-4694-a933-2db5ef86b336	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
f70dfd4b-01f8-49c0-bdbe-f7b48694b6ed	2857240c-c6bc-49b7-95e4-4ae06cae22ad	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
6ce4787e-c961-44f6-8d9a-c4ab53b15e30	8473aafa-5ce2-4027-9ab8-a0dd85d1fb99	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
c44b06be-2ef2-4b16-ae56-1218064cd06c	02b1cb2e-8f63-42ad-8cba-8eda10b9dadd	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
4b77b6bc-8b50-495e-9913-b925e3cca5af	ea567e56-8bac-499f-965d-7db8adcdef25	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
380ddca6-207f-471a-a256-d0266a8fad04	65cbbbc2-3d4d-4a31-b634-0ca76553d98a	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
fa4a7dc9-7fb2-4e6a-8274-f2c83eeff6b8	f047399b-7bd9-4e78-976c-320b64c775e1	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
a5dc5d02-e5a5-4026-809f-9a62fd6a306c	5b65b66d-c108-4a18-8272-d69e0b18f8e1	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
0dd5da73-3963-4693-a0e4-15137b373fda	1ee3e6d7-81a5-443a-b895-91c8b314443f	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
d4f3c6ff-1eef-43b4-b2ec-09d7f627b854	bf12da2f-92a2-47eb-b324-dde5c540f01c	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
59b2fceb-ac41-4d7e-bf6e-655c00c9a6af	b7d94c9a-66c1-4424-ae54-038819905ba5	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
47e73c87-865b-42f6-b548-2c16224b8fa2	d7b12546-2597-477a-94d3-d881d6930d7a	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
208f69a1-3677-4b19-a167-cf924011f2e7	b9316a87-fedc-405c-b4dc-f53c719a6124	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
168c96ee-f10b-4ec9-bb66-ae556b32603b	81679956-c438-43af-a334-c2176c6872e8	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
28d22b35-27ad-41af-8f99-3bcd1b90b815	9ab702a2-513d-4aca-9139-5e4b4399b6c4	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
1fb342ae-085d-4cfe-be86-48b77d3b6e66	bb8c958b-3498-4c21-a8c1-188d64bdf28f	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
cc005c3f-fbd2-4887-96db-78d2a7f61a73	594291b6-8221-41bc-a2f6-292123b0f817	864b011f-42b1-44d2-91de-0ef9e6b2b597	SUCCESS	0
\.


--
-- Data for Name: feedbacks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.feedbacks (id, enrollment_id, checkpoint, rating, comments) FROM stdin;
\.


--
-- Data for Name: finance_audit_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.finance_audit_logs (id, action, entity, entity_id, details, performed_by, created_at) FROM stdin;
\.


--
-- Data for Name: finance_bank_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.finance_bank_records (id, entry_type, bank_name, account_no, amount, description, reference, valid_from, valid_until, status, created_at) FROM stdin;
\.


--
-- Data for Name: finance_budgets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.finance_budgets (id, vertical, financial_year, allocated, used, released, description, created_at, updated_at) FROM stdin;
a0169f4f-58cb-4c2e-bb95-50deda057f50	TRAINING	2025-26	5000000	1200000	3000000	\N	2026-04-25 01:54:37.194934	2026-04-25 01:54:37.194934
27fda8b6-5d7a-49b0-9209-3d4f52d07c73	TBB	2025-26	2000000	450000	1000000	\N	2026-04-25 01:54:37.194934	2026-04-25 01:54:37.194934
3ffd0c55-d1c3-498c-a469-43f5414a811b	FRR	2025-26	3500000	800000	2000000	\N	2026-04-25 01:54:37.194934	2026-04-25 01:54:37.194934
\.


--
-- Data for Name: finance_donor_funds; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.finance_donor_funds (id, donor_name, donor_type, amount, vertical, project, purpose, reference, received_at, created_at) FROM stdin;
\.


--
-- Data for Name: finance_requisitions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.finance_requisitions (id, vertical, amount, purpose, description, financial_year, status, rejection_note, approved_amount, released_amount, raised_by_id, approved_by_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: finance_salaries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.finance_salaries (id, employee_type, employee_name, vertical, amount, month, status, payment_date, reference, commission, user_id, created_at) FROM stdin;
\.


--
-- Data for Name: finance_transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.finance_transactions (id, transaction_type, source, amount, description, reference, status, user_id, created_at) FROM stdin;
3b6b1044-5624-46e8-9705-0ef7ee87be89	FUND_RELEASE	TRAINING	500000	Quarterly fund release for Training Vertical	\N	SUCCESS	\N	2026-04-25 01:54:37.194934
df45c7d1-508f-48bd-87a8-b42ddc8ff36e	SALARY	TBB	120000	Monthly trainer payouts - April 2026	\N	SUCCESS	\N	2026-04-25 01:54:37.194934
74a001ac-7ca8-4ed3-adf7-42be0249013f	EXPENSE	FRR	45000	Marketing and Corporate Outreach	\N	SUCCESS	\N	2026-04-25 01:54:37.194934
\.


--
-- Data for Name: finance_utilisations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.finance_utilisations (id, requisition_id, vertical, amount, description, bill_no, status, rejection_note, submitted_by_id, verified_by_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lessons (id, batch_id, topic_name, teacher_id, scheduled_at) FROM stdin;
\.


--
-- Data for Name: memberships; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.memberships (id, tier_name, coin_multiplier, initial_coins) FROM stdin;
1	Basic	1.0	1
2	Silver	1.2	10
3	Gold	1.5	100
4	Diamond	2.0	1000
5	Platinum	3.0	2000
6	Basic	1.0	1
7	Silver	1.2	10
8	Gold	1.5	100
9	Diamond	2.0	1000
10	Platinum	3.0	2000
11	Basic	1.0	1
12	Silver	1.2	10
13	Gold	1.5	100
14	Diamond	2.0	1000
15	Platinum	3.0	2000
16	Basic	1.0	1
17	Silver	1.2	10
18	Gold	1.5	100
19	Diamond	2.0	1000
20	Platinum	3.0	2000
21	Basic	1.0	1
22	Silver	1.2	10
23	Gold	1.5	100
24	Diamond	2.0	1000
25	Platinum	3.0	2000
\.


--
-- Data for Name: mentorship_slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mentorship_slots (id, mentor_id, student_id, scheduled_time, is_paid) FROM stdin;
\.


--
-- Data for Name: partners; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.partners (id, name, zone_id, commission_rate, revenue_share_config) FROM stdin;
593a84a0-26fa-48be-bdde-d90f9780bd04	Skill Park Trivandrum	1	12.5	\N
7c289baf-cad8-4969-bbf8-7602a66c8ee1	ASAP Community Park Kochi	2	10.0	\N
f72819dd-83cb-46b0-b7b4-444a80a3f1cf	Future Lab Kozhikode	3	15.0	\N
7a331258-ae94-4e9a-b4a7-6d53d2003450	Skill Park Trivandrum	1	12.5	\N
24b23fa1-3b90-4901-a399-1beecf10625d	ASAP Community Park Kochi	2	10.0	\N
7909178f-6cf0-4304-8be8-7daeea29932e	Future Lab Kozhikode	3	15.0	\N
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name) FROM stdin;
1	ADMIN
2	STUDENT
3	MENTOR
4	TRAINER
5	PARTNER_PM
6	CORPORATE
43	FINANCE_OFFICER
44	VERTICAL_USER
\.


--
-- Data for Name: skill_coin_transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.skill_coin_transactions (id, student_id, amount, activity_type, created_at) FROM stdin;
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.students (id, user_id, aadhaar_hash, student_tag_id, category, skill_coin_balance, total_skill_score, membership_id, name) FROM stdin;
a38a2b48-c66d-4580-b153-f3aa1939153c	743e09df-b3b5-410a-987c-c80a949af557	AADHAAR-1	ASAP-ST-1	DIR	0	0	\N	\N
8bce3a9b-53a0-44a0-9d3a-72de7efbf9ce	8be1cf42-0bfa-4ec2-b6c0-2cd174c8146f	AADHAAR-2	ASAP-ST-2	DIR	0	0	\N	\N
a287270f-90b8-4217-a127-a054c298050b	79e859c4-53f5-451e-a044-62807d552527	AADHAAR-3	ASAP-ST-3	DIR	0	0	\N	\N
f3f7da1b-7527-4d6b-bd8c-876327128bd9	a13b524d-65e8-420f-842e-7e28fac2d0ca	AADHAAR-4	ASAP-ST-4	DIR	0	0	\N	\N
20a1d333-efdf-4e84-adfb-da5a82d6f51d	bcfd1af0-96ba-4b94-b9d7-a920b2ebe3a4	AADHAAR-5	ASAP-ST-5	DIR	0	0	\N	\N
01cb9089-7777-4804-b56d-02009dbfe4ef	df1992ae-f5e6-411f-8fd2-d9a1d0986045	AADHAAR-6	ASAP-ST-6	DIR	0	0	\N	\N
8239ccf7-a307-4521-8620-05e081ee75c2	f9f90ead-8bbc-4a09-84da-a0a6fab85c6e	AADHAAR-7	ASAP-ST-7	DIR	0	0	\N	\N
a491ceda-bce1-467c-b8aa-73e6e1f7a846	316103c5-26a3-4bd8-87f4-4ea85929dbf6	AADHAAR-8	ASAP-ST-8	DIR	0	0	\N	\N
4a43e8d0-0a0a-4754-80fe-239390d6986e	f6c4cd6e-d033-4f7a-b727-70ae4ad351de	AADHAAR-9	ASAP-ST-9	DIR	0	0	\N	\N
3b3f7658-e676-4b7f-9230-d1c060b859fa	62d1e8f5-28f5-4d29-9290-b06944b1fffa	AADHAAR-10	ASAP-ST-10	DIR	0	0	\N	\N
262c3ec5-f944-4d4b-83aa-eb8cca2b9023	b03675f1-8001-42a2-83f9-61cb44198a9e	AADHAAR-11	ASAP-ST-11	DIR	0	0	\N	\N
bcf5d602-6055-4d16-b22d-1850a3dae2c6	52c61a20-68d9-42e3-82c9-e512a1ce13a0	AADHAAR-12	ASAP-ST-12	DIR	0	0	\N	\N
44143488-0098-4803-993f-e3beb0bd574f	85f847dc-bb7e-4c5a-b8ab-042b723f8e12	AADHAAR-13	ASAP-ST-13	DIR	0	0	\N	\N
e2f32a16-2707-4816-97da-60b72cad2974	2ee2cca2-8a44-48e2-a80b-e7cf123a3dab	AADHAAR-14	ASAP-ST-14	DIR	0	0	\N	\N
dedf8ae2-1e1f-40f3-86a4-0209e27c6d53	fa902c22-8719-40e8-82bf-dca56550f09c	AADHAAR-15	ASAP-ST-15	DIR	0	0	\N	\N
8cd22304-0410-43ad-8359-040abb1c3ec9	e21b90ff-d103-497f-964d-b3865b437e12	AADHAAR-16	ASAP-ST-16	DIR	0	0	\N	\N
b593b12a-c44c-4e71-bbee-586fbb0892cf	d2a264e9-5b50-4a6b-95de-7c2afe3fa5d6	AADHAAR-17	ASAP-ST-17	DIR	0	0	\N	\N
88906ba4-f2a9-496f-84db-0f0601d0e01a	3903a5e7-9dac-40c8-aeec-9761beafd8cd	AADHAAR-18	ASAP-ST-18	DIR	0	0	\N	\N
19728a2e-2e8b-4314-952d-56cf1ea4e1b5	55a655c3-20fc-4214-8646-167a355d3956	AADHAAR-19	ASAP-ST-19	DIR	0	0	\N	\N
f317d034-47be-4966-89ab-35646936589e	e8536176-90bd-4a51-b49d-53bba89d5b7e	AADHAAR-20	ASAP-ST-20	DIR	0	0	\N	\N
6f9d061b-79b3-4cb8-a625-43b1368d8fb6	d3560622-6bdc-43d3-a965-6ccca4a27570	AADHAAR-21	ASAP-ST-21	DIR	0	0	\N	\N
0cf27a2a-0c0a-4938-8cf7-819f54c64884	dde222de-e237-4b29-80a6-47613792c588	AADHAAR-22	ASAP-ST-22	DIR	0	0	\N	\N
b78472e8-287c-4efb-8ecd-5c0b18a93ac3	3d01be7d-84c1-4e3e-b90a-b16e849cd7da	AADHAAR-23	ASAP-ST-23	DIR	0	0	\N	\N
0b23d3b9-701b-4f1b-ba3f-1c1c9a03b59d	edae9f11-5a94-4705-a49a-cadf558245e8	AADHAAR-24	ASAP-ST-24	DIR	0	0	\N	\N
faa03e9f-5a92-4828-983e-238db36fdbc4	eb86b57a-53bf-4f31-80bd-72dab44678f4	AADHAAR-25	ASAP-ST-25	DIR	0	0	\N	\N
19087c60-0163-400f-8109-0542b4ffdd23	fe9573a1-5e99-4220-8898-bd236ea02f11	AADHAAR-26	ASAP-ST-26	DIR	0	0	\N	\N
cc6c551e-4e0f-4039-ad6e-a8e75d0e2bba	9769b3e7-ad2d-46ff-9f08-a5c48384edb1	AADHAAR-27	ASAP-ST-27	DIR	0	0	\N	\N
3e8af8a0-e977-4c4e-821b-8ac5b2382a0c	a05efdd0-f9eb-489f-ad19-5ceb7287bde7	AADHAAR-28	ASAP-ST-28	DIR	0	0	\N	\N
2f65a29c-e043-4ffc-94d9-8e6a28319b45	179183bd-ab01-4cbe-8385-68683d665f3d	AADHAAR-29	ASAP-ST-29	DIR	0	0	\N	\N
9d82131f-12fe-45c5-8c1c-2ef452aa7c03	6fc4027d-8145-4571-850d-c67be9195492	AADHAAR-30	ASAP-ST-30	DIR	0	0	\N	\N
fdbe6d95-d98a-49b7-a3f5-a61c9109fe71	eac92d26-be49-4204-b4fe-3484198ca956	AADHAAR-31	ASAP-ST-31	DIR	0	0	\N	\N
0145785f-89c1-47d9-9b5c-9fdb37616763	d09fb8bb-8dfb-4718-8024-519a45cbe6e1	AADHAAR-32	ASAP-ST-32	DIR	0	0	\N	\N
6daf9ad6-42ef-4079-9944-9c5da035a43e	96b26cd1-b701-489c-89ea-43b757134dc7	AADHAAR-33	ASAP-ST-33	DIR	0	0	\N	\N
3919c739-2e33-4750-8edb-a0ed72c678c2	15332fe0-b2dc-44b4-be02-309b2dc532fb	AADHAAR-34	ASAP-ST-34	DIR	0	0	\N	\N
3291347f-15e0-41a6-b9d9-c7577f7a785c	50930d7a-a445-4419-a66a-592b6896e1f7	AADHAAR-35	ASAP-ST-35	DIR	0	0	\N	\N
953b3b47-01d4-43ec-8b43-b505080138ce	4df3ff04-d9f2-43e8-bd05-045454d34d59	AADHAAR-36	ASAP-ST-36	DIR	0	0	\N	\N
3c9696fb-3df9-46e4-888e-aa485be63624	8cb0d427-1c8d-4ec2-a117-058ca91204d7	AADHAAR-37	ASAP-ST-37	DIR	0	0	\N	\N
cc79214c-34c6-442e-8f15-fe1a770135dc	1b70e77d-757f-4327-ac42-f4cb3b27e847	AADHAAR-38	ASAP-ST-38	DIR	0	0	\N	\N
92ab585c-ab3b-4b52-a51e-a71058a4c076	170d21ec-8b62-48c1-965e-6c925a4f50c8	AADHAAR-39	ASAP-ST-39	DIR	0	0	\N	\N
869a03ba-a1cc-4775-8b49-1c5fb710806b	3e977ef1-7581-414c-a03b-46de694d981f	AADHAAR-40	ASAP-ST-40	DIR	0	0	\N	\N
ee50a453-ccde-45d4-9bcb-d6dc7f3fdd62	d9406509-fe62-4716-b235-bb6277c1b631	AADHAAR-41	ASAP-ST-41	DIR	0	0	\N	\N
1acb9752-2cbb-4671-a86b-c798149890c2	0bbc5164-aa51-48b7-8012-d6241105178f	AADHAAR-42	ASAP-ST-42	DIR	0	0	\N	\N
ce8a232e-4426-4304-bc2f-101c7857edf1	23ee96cd-1ca9-40fc-8e7e-ebf1922ad6ca	AADHAAR-43	ASAP-ST-43	DIR	0	0	\N	\N
5f8fb344-e90d-4f68-86c6-5ba402d69db3	084fd4e4-3403-4035-9d94-bd86965c9c22	AADHAAR-44	ASAP-ST-44	DIR	0	0	\N	\N
3f9ac085-8993-45aa-8a51-8d08193b31c7	8dcdfcdc-c531-4b7e-b8b7-bf0702ca7e37	AADHAAR-45	ASAP-ST-45	DIR	0	0	\N	\N
4d54272b-c029-4107-89f3-8d68ead6f5f1	97270f1c-f442-436c-9372-af59baa3b137	AADHAAR-46	ASAP-ST-46	DIR	0	0	\N	\N
dc66fd31-8216-479e-a667-08a607cc837c	54ca0c26-4f2e-4802-85f3-826272e1130a	AADHAAR-47	ASAP-ST-47	DIR	0	0	\N	\N
0dc9924e-f726-4d25-9679-d550a69e84fc	eef0439c-c949-4021-afc6-ebc11e5432e1	AADHAAR-48	ASAP-ST-48	DIR	0	0	\N	\N
4b05fa05-3878-450c-98d9-7db0e5542493	0e29b483-7a8b-46d1-8056-b3f008f3e672	AADHAAR-49	ASAP-ST-49	DIR	0	0	\N	\N
7cdc1e90-af7e-43ac-9f68-30a69096250b	b0f225b6-95c7-4a77-9981-8ea92dc98067	AADHAAR-50	ASAP-ST-50	DIR	0	0	\N	\N
0c71684d-ae0d-4c89-86b7-653bc5fbe011	d054d3bb-e5b8-4f7a-a518-0bfc6376e74e	AADHAAR-51	ASAP-ST-51	DIR	0	0	\N	\N
5c4b6e49-b0d1-41d2-b810-5a8bbe525fc5	87e4610f-063d-405a-a0ad-50d4c07e24b1	AADHAAR-52	ASAP-ST-52	DIR	0	0	\N	\N
29fa51f5-64f8-4d2e-8e05-6857916adbd1	fedd8ea3-b162-4ceb-aa04-2d82d9a87e4f	AADHAAR-53	ASAP-ST-53	DIR	0	0	\N	\N
08b57c14-154f-4810-a72e-47c8667bcc57	06b827e0-637a-4b4d-995f-9f277fda9a35	AADHAAR-54	ASAP-ST-54	DIR	0	0	\N	\N
4581aaf0-8df2-4022-841e-d3e816e9f377	d52fead8-f629-407e-aece-17a3c3ba25d8	AADHAAR-55	ASAP-ST-55	DIR	0	0	\N	\N
82e67dcf-5186-426c-a987-3f2cd0c4b0e5	75518f70-e1fc-4fd1-b459-ddc73a19757e	AADHAAR-56	ASAP-ST-56	DIR	0	0	\N	\N
73725c32-13f2-4f6b-99e2-97d066670a2d	d5ac58de-5824-4d57-ba39-3529b1a75478	AADHAAR-57	ASAP-ST-57	DIR	0	0	\N	\N
86520640-ce84-4852-bd0e-b85e4ce96216	5b8d22af-22c2-41ca-90f4-c697e8bbd012	AADHAAR-58	ASAP-ST-58	DIR	0	0	\N	\N
bcafd83f-011b-4fa2-a0a2-1bd813a5ad23	81df0926-0792-48a1-9c9d-093c1034a5d0	AADHAAR-59	ASAP-ST-59	DIR	0	0	\N	\N
b423e89c-2a1e-453e-9246-7293cc513f73	4044ad03-9302-4494-a76d-a640fed151a6	AADHAAR-60	ASAP-ST-60	DIR	0	0	\N	\N
795bbc94-cee4-4784-84df-0cdf1cef2839	163cda4e-7ba2-41b3-94e8-e00fc8dcd74d	AADHAAR-61	ASAP-ST-61	DIR	0	0	\N	\N
6c2cf5f7-548b-4114-a5bf-bba8cd6d8d01	76828d86-5f88-4d26-84ba-ac4467e8e41b	AADHAAR-62	ASAP-ST-62	DIR	0	0	\N	\N
43f77212-0519-495b-b2dc-2976bf91811b	3322c112-b988-4358-bab2-2164bd17ac8f	AADHAAR-63	ASAP-ST-63	DIR	0	0	\N	\N
1aeb0157-bad2-4c1d-9933-d95250811101	361427d0-0e7b-472d-93bf-5a9b7b493393	AADHAAR-64	ASAP-ST-64	DIR	0	0	\N	\N
d463c75f-7c48-4460-ac83-00fc95192928	b1dae146-6839-415b-8afc-3a61730549f8	AADHAAR-65	ASAP-ST-65	DIR	0	0	\N	\N
addc40b5-ab7f-4fce-8813-e5c9defa4ead	6eb04816-bb58-497b-afa3-e60413fa1ca9	AADHAAR-66	ASAP-ST-66	DIR	0	0	\N	\N
b267d6e9-9a39-497b-ad5c-d2a51edcf0ce	168a6460-8a67-4ca2-824f-714889b4dba8	AADHAAR-67	ASAP-ST-67	DIR	0	0	\N	\N
af9d0221-2429-4edf-99e3-3d66a16d1fd0	3d7d3785-8e19-40c8-b3cd-34e194e6f002	AADHAAR-68	ASAP-ST-68	DIR	0	0	\N	\N
d540671c-012b-4e58-b955-3a125fb5c6d5	031ad19c-5d4f-459c-ae08-5ced6c085798	AADHAAR-69	ASAP-ST-69	DIR	0	0	\N	\N
be9775a5-9479-493d-beb9-06649cfc4f3a	79daac85-215d-4e36-9579-8f5eed9dc6ad	AADHAAR-70	ASAP-ST-70	DIR	0	0	\N	\N
dd19d386-2715-41c4-945c-f9434827a195	dc71afdf-376c-4e6a-8780-7ba2033d9925	AADHAAR-71	ASAP-ST-71	DIR	0	0	\N	\N
bd6355a6-84aa-4674-ac3d-d41d6d42cde1	1a061fe3-8014-4e58-b2c6-7939346fb2b7	AADHAAR-72	ASAP-ST-72	DIR	0	0	\N	\N
2069c715-ddda-490a-800f-771abffa31d5	eebef3cd-d280-4e74-8029-32acadc65a73	AADHAAR-73	ASAP-ST-73	DIR	0	0	\N	\N
0060e28f-0da9-47c2-ac55-410dfe7d0b15	4d20624e-4884-4ca1-9896-7eed7b22da39	AADHAAR-74	ASAP-ST-74	DIR	0	0	\N	\N
99c86e6d-73c0-4fce-a9e0-26f5968805a9	33b128e5-8507-40ad-9333-b6f4f10f94af	AADHAAR-75	ASAP-ST-75	DIR	0	0	\N	\N
a0030756-32f0-4912-b971-7a993b630a57	b93e4374-84fa-454a-a23a-a656e6ed213f	AADHAAR-76	ASAP-ST-76	DIR	0	0	\N	\N
9a46ee2a-dbe3-486a-acaf-35c81bf293bb	391b2952-48b6-4c79-a0d5-48e23828fee4	AADHAAR-77	ASAP-ST-77	DIR	0	0	\N	\N
46821f57-8ada-4236-adde-fcda02e64be0	159e477d-1f88-427c-87c8-e325f08f91f9	AADHAAR-78	ASAP-ST-78	DIR	0	0	\N	\N
03ae4485-8ca6-4788-a4ce-59baf1fc011c	29c952eb-49e0-4216-9af2-5e22813f0ffa	AADHAAR-79	ASAP-ST-79	DIR	0	0	\N	\N
cf2767f4-ec45-43bd-b709-190396cd0c15	796fa084-911d-4332-882f-65ae375f24c0	AADHAAR-80	ASAP-ST-80	DIR	0	0	\N	\N
b355d16a-a577-4f95-80f3-a80619fde9bc	85be042b-a5e4-47be-9f3a-63d0400d5940	AADHAAR-81	ASAP-ST-81	DIR	0	0	\N	\N
833208b7-e453-48be-8166-639aceb76555	e42377fe-b121-4633-b52f-25407d8d0a66	AADHAAR-82	ASAP-ST-82	DIR	0	0	\N	\N
89a8d73c-f60e-4968-a584-14f0065effda	160ba29b-5596-48c1-903c-3935d571f7b6	AADHAAR-83	ASAP-ST-83	DIR	0	0	\N	\N
0535c58b-525e-4c27-8a26-92cac4f12e7b	1dd8f2a5-7184-4e01-9fe2-86ff94748844	AADHAAR-84	ASAP-ST-84	DIR	0	0	\N	\N
1c0c5015-2fee-4519-9b39-d772d4b466ac	a85dd98e-ea75-42b8-ad4b-f4352f5d8693	AADHAAR-85	ASAP-ST-85	DIR	0	0	\N	\N
93a13b3e-bf5a-4e1a-8b35-329e37d102f7	406c0a45-d434-4bb8-a0ea-1801116330c7	AADHAAR-86	ASAP-ST-86	DIR	0	0	\N	\N
ccbdb7f2-9369-4cbc-8c6e-74ad6d1e123b	89342145-9fe6-4a1c-93d3-4b4318d0de35	AADHAAR-87	ASAP-ST-87	DIR	0	0	\N	\N
9b85752b-c536-4211-b2b5-13232ea31c5b	3b70fdc8-7c37-4a98-a21e-4d8575647f27	AADHAAR-88	ASAP-ST-88	DIR	0	0	\N	\N
2897e940-1b00-4316-bd6c-ade5ef0844d0	228961cd-a280-4d84-b60a-d0ceab6aa254	AADHAAR-89	ASAP-ST-89	DIR	0	0	\N	\N
3cea3805-e011-4215-a97c-683ff15aa5d1	09b9e62a-b81f-4f59-9a97-4e8d0d894d32	AADHAAR-90	ASAP-ST-90	DIR	0	0	\N	\N
b0812e78-74cd-406d-a3b1-0ae95f770c9a	251f7a65-3370-48c1-a6f8-5800901f815b	AADHAAR-91	ASAP-ST-91	DIR	0	0	\N	\N
0e909863-37c0-46ca-be9e-5fda9e4edaea	4aa47770-0bb2-497f-bfab-bb6340f90443	AADHAAR-92	ASAP-ST-92	DIR	0	0	\N	\N
b988c817-e0a5-4688-93b3-a250c0bd35cd	6f1772d3-1dc3-47e9-9f51-0db07d7d7922	AADHAAR-93	ASAP-ST-93	DIR	0	0	\N	\N
75929eab-9107-4694-a933-2db5ef86b336	d6796332-a30c-4bff-84e3-350aa9f6cf67	AADHAAR-94	ASAP-ST-94	DIR	0	0	\N	\N
2857240c-c6bc-49b7-95e4-4ae06cae22ad	f5885e50-1085-465a-abc8-03de11ea41dd	AADHAAR-95	ASAP-ST-95	DIR	0	0	\N	\N
8473aafa-5ce2-4027-9ab8-a0dd85d1fb99	96a28970-3e9e-4393-8d45-82c11681780c	AADHAAR-96	ASAP-ST-96	DIR	0	0	\N	\N
02b1cb2e-8f63-42ad-8cba-8eda10b9dadd	1f8a7f92-e303-4a3e-a0c3-4e806bac6086	AADHAAR-97	ASAP-ST-97	DIR	0	0	\N	\N
ea567e56-8bac-499f-965d-7db8adcdef25	fd991a67-531f-43ed-ac82-b1a5cea261a6	AADHAAR-98	ASAP-ST-98	DIR	0	0	\N	\N
65cbbbc2-3d4d-4a31-b634-0ca76553d98a	c32c9a23-6e59-46fc-b3f6-730a7c258015	AADHAAR-99	ASAP-ST-99	DIR	0	0	\N	\N
f047399b-7bd9-4e78-976c-320b64c775e1	bdcd1e8d-a4d9-453a-a0b8-bcc7ebc7796b	AADHAAR-100	ASAP-ST-100	DIR	0	0	\N	\N
5b65b66d-c108-4a18-8272-d69e0b18f8e1	ad271ece-bb08-4679-8458-74e043921ffe	AADHAAR-101	ASAP-ST-101	DIR	0	0	\N	\N
1ee3e6d7-81a5-443a-b895-91c8b314443f	006f6ec5-ae77-46b1-b0a3-2680d898f65a	AADHAAR-102	ASAP-ST-102	DIR	0	0	\N	\N
bf12da2f-92a2-47eb-b324-dde5c540f01c	27eabded-e99e-41a7-94d1-fb3e9c297ba8	AADHAAR-103	ASAP-ST-103	DIR	0	0	\N	\N
b7d94c9a-66c1-4424-ae54-038819905ba5	4aee5ab1-c26c-4326-8789-b7acaa26c4a8	AADHAAR-104	ASAP-ST-104	DIR	0	0	\N	\N
d7b12546-2597-477a-94d3-d881d6930d7a	9a9d869a-e7e5-434e-ac88-fa5698130f26	AADHAAR-105	ASAP-ST-105	DIR	0	0	\N	\N
b9316a87-fedc-405c-b4dc-f53c719a6124	445e5fcf-6fcc-4cd8-a700-f01123678b6f	AADHAAR-106	ASAP-ST-106	DIR	0	0	\N	\N
81679956-c438-43af-a334-c2176c6872e8	2dc87229-a878-437f-8a20-1f1b39b20aca	AADHAAR-107	ASAP-ST-107	DIR	0	0	\N	\N
9ab702a2-513d-4aca-9139-5e4b4399b6c4	6e708929-208d-4447-8b93-5869515d468f	AADHAAR-108	ASAP-ST-108	DIR	0	0	\N	\N
bb8c958b-3498-4c21-a8c1-188d64bdf28f	3beabaa4-c574-430d-934b-3c918146da48	AADHAAR-109	ASAP-ST-109	DIR	0	0	\N	\N
594291b6-8221-41bc-a2f6-292123b0f817	636e0925-35ed-4d06-895f-b74cfd100f36	AADHAAR-110	ASAP-ST-110	DIR	0	0	\N	\N
3920645c-bb6e-4869-a351-2d314aafdf1a	b0b4201b-0b7a-4dfe-b514-c3aa20edf6e0	12344321567	ASAP-ST-1777058292594-0	DIR	0	0	\N	\N
e37ed4b9-c3a1-4686-a6ee-7d886235f516	d0526a12-b2c5-48ac-9dff-d06d4aa7590d	56788765432	ASAP-ST-1777058292602-1	DIR	0	0	\N	\N
0e9fa867-cd3f-4cd7-8900-813d895ca347	9fa053b7-1ed5-4452-9fa6-9b1b74370cee	101233209297	ASAP-ST-1777058292608-2	DIR	0	0	\N	\N
313560f2-1180-45f9-9f98-d5358ac2cb7a	162e8de6-9ee6-4757-a95e-1e219f284244	145677653162	ASAP-ST-1777058292613-3	DIR	0	0	\N	\N
3642a8b8-ec7e-42b2-b2ea-d70e05b76242	93b706d8-797f-4ea1-b063-2aab4df7017c	190122097027	ASAP-ST-1777058292617-4	DIR	0	0	\N	\N
00975aa8-f168-4f4d-b981-6c4809de4b8f	01ee918e-5ceb-4019-9066-dc11d89e2960	234566540892	ASAP-ST-1777058292623-5	DIR	0	0	\N	\N
670ed33c-f5d7-4dc1-8531-d973bde371e2	925267d8-3945-457b-89b4-f9517cb42f35	279010984757	ASAP-ST-1777058292630-6	DIR	0	0	\N	\N
6daa8145-400c-479a-a017-53229ab64d36	53d46996-bcf4-4c09-b795-0870b8572a6c	323455428622	ASAP-ST-1777058292634-7	DIR	0	0	\N	\N
6f7e6298-4009-4f5f-b64b-acd49fd588fa	a907cc9e-e59d-47f8-a60f-d3c98df6b329	367899872487	ASAP-ST-1777058292641-8	DIR	0	0	\N	\N
3b042ca0-89ad-4b0a-809b-1229a599e5fe	36aa128d-bfcd-49c5-b3cd-d0b04583d509	412344316352	ASAP-ST-1777058292645-9	DIR	0	0	\N	\N
68998eae-e058-4eb4-b8c4-95c489dd7312	46654348-2d38-4522-bdbf-0ed2bfec300f	456788760217	ASAP-ST-1777058292650-10	DIR	0	0	\N	\N
d8b98ca8-11bd-44b6-b450-eee53f2492f2	5e6ca54f-08c8-498b-890e-92e4056eb9ba	501233204082	ASAP-ST-1777058292657-11	DIR	0	0	\N	\N
7b6c66cd-6e82-4f34-8afe-c4ad11251daf	c6c059bf-6a85-48dd-897e-f2327a0b234a	545677647947	ASAP-ST-1777058292661-12	DIR	0	0	\N	\N
5088a1fa-d8a0-403e-adf6-fafcda1c3f38	38a56cf9-e975-4e46-867c-42212baed1d8	590122091812	ASAP-ST-1777058292666-13	DIR	0	0	\N	\N
dda2cece-bd52-461c-ad36-9561f574d22d	4a6b676d-9909-48a3-a0cb-1f37cd6d39ca	634566535677	ASAP-ST-1777058292674-14	DIR	0	0	\N	\N
a4b7b2f3-a3ec-484e-ad17-48b7e8c9cb77	4fea842c-72aa-4cf4-92e1-869ca23fbd6a	679010979542	ASAP-ST-1777058292678-15	DIR	0	0	\N	\N
98a83a2e-bd22-4b23-ba8c-887925a79c27	1f4814c4-d4e4-49db-8ebe-5dd9a2b4525b	723455423407	ASAP-ST-1777058292685-16	DIR	0	0	\N	\N
c31f5a59-5c45-48a3-b628-8b05b71a322e	012911c5-0cf2-445e-aff6-bc4781ccf538	767899867272	ASAP-ST-1777058292692-17	DIR	0	0	\N	\N
7a7d4bd9-c0c8-48e1-8551-ea6c938ca603	32fb97ec-1c95-491c-b691-3385d4c250a9	812344311137	ASAP-ST-1777058292697-18	DIR	0	0	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, mobile, password_hash, role_id, is_active, created_at, category, status) FROM stdin;
3e977ef1-7581-414c-a03b-46de694d981f	student40@asap.com	9000000040	psw	2	t	2026-04-25 00:02:27.143733	DIR	active
d9406509-fe62-4716-b235-bb6277c1b631	student41@asap.com	9000000041	psw	2	t	2026-04-25 00:02:27.14654	DIR	active
0bbc5164-aa51-48b7-8012-d6241105178f	student42@asap.com	9000000042	psw	2	t	2026-04-25 00:02:27.148938	DIR	active
23ee96cd-1ca9-40fc-8e7e-ebf1922ad6ca	student43@asap.com	9000000043	psw	2	t	2026-04-25 00:02:27.151449	DIR	active
084fd4e4-3403-4035-9d94-bd86965c9c22	student44@asap.com	9000000044	psw	2	t	2026-04-25 00:02:27.15425	DIR	active
8dcdfcdc-c531-4b7e-b8b7-bf0702ca7e37	student45@asap.com	9000000045	psw	2	t	2026-04-25 00:02:27.158585	DIR	active
97270f1c-f442-436c-9372-af59baa3b137	student46@asap.com	9000000046	psw	2	t	2026-04-25 00:02:27.161344	DIR	active
54ca0c26-4f2e-4802-85f3-826272e1130a	student47@asap.com	9000000047	psw	2	t	2026-04-25 00:02:27.168763	DIR	active
eef0439c-c949-4021-afc6-ebc11e5432e1	student48@asap.com	9000000048	psw	2	t	2026-04-25 00:02:27.171505	DIR	active
0e29b483-7a8b-46d1-8056-b3f008f3e672	student49@asap.com	9000000049	psw	2	t	2026-04-25 00:02:27.173959	DIR	active
b0f225b6-95c7-4a77-9981-8ea92dc98067	student50@asap.com	9000000050	psw	2	t	2026-04-25 00:02:27.176595	DIR	active
6a44f962-d133-4e10-a585-3782f061398e	admin@asapkerala.org	0000000000	$2b$10$9ran77GqEH3JjDOigicW..8nZjOn5zvUkZvtqgWxoQiM6h/Z/mAB6	1	t	2026-04-24 17:58:54.162112	ALL	active
3a045d8c-d255-4ce3-b4a7-597c1cd2e7a4	tbb-admin@asap.com	0000000001	psw	1	t	2026-04-24 20:03:07.805487	TBB	active
ea7c0123-31f1-483b-a331-4bfaddb1e2b7	frr-admin@asap.com	0000000002	psw	1	t	2026-04-24 20:03:07.807206	FRR	active
34efdd0c-049b-4601-a7b2-de438ce9f878	partner1@asap.com	0000000003	psw	5	t	2026-04-24 20:03:07.808379	DIR	enrolling
2aa92c7c-2413-4385-97a3-bb6655ec29f3	partner2@asap.com	0000000004	psw	5	t	2026-04-24 20:03:07.809793	DIR	audit_round_1
e9bc693e-cc27-4aeb-af4d-3150d8f02104	partner3@asap.com	0000000005	psw	5	t	2026-04-24 20:03:07.811314	DIR	active
743e09df-b3b5-410a-987c-c80a949af557	student1@asap.com	9000000001	psw	2	t	2026-04-25 00:02:26.995364	DIR	active
8be1cf42-0bfa-4ec2-b6c0-2cd174c8146f	student2@asap.com	9000000002	psw	2	t	2026-04-25 00:02:27.005681	DIR	active
79e859c4-53f5-451e-a044-62807d552527	student3@asap.com	9000000003	psw	2	t	2026-04-25 00:02:27.009255	DIR	active
a13b524d-65e8-420f-842e-7e28fac2d0ca	student4@asap.com	9000000004	psw	2	t	2026-04-25 00:02:27.012598	DIR	active
bcfd1af0-96ba-4b94-b9d7-a920b2ebe3a4	student5@asap.com	9000000005	psw	2	t	2026-04-25 00:02:27.017032	DIR	active
df1992ae-f5e6-411f-8fd2-d9a1d0986045	student6@asap.com	9000000006	psw	2	t	2026-04-25 00:02:27.020623	DIR	active
f9f90ead-8bbc-4a09-84da-a0a6fab85c6e	student7@asap.com	9000000007	psw	2	t	2026-04-25 00:02:27.0232	DIR	active
316103c5-26a3-4bd8-87f4-4ea85929dbf6	student8@asap.com	9000000008	psw	2	t	2026-04-25 00:02:27.025032	DIR	active
f6c4cd6e-d033-4f7a-b727-70ae4ad351de	student9@asap.com	9000000009	psw	2	t	2026-04-25 00:02:27.026715	DIR	active
62d1e8f5-28f5-4d29-9290-b06944b1fffa	student10@asap.com	9000000010	psw	2	t	2026-04-25 00:02:27.028226	DIR	active
b03675f1-8001-42a2-83f9-61cb44198a9e	student11@asap.com	9000000011	psw	2	t	2026-04-25 00:02:27.031261	DIR	active
52c61a20-68d9-42e3-82c9-e512a1ce13a0	student12@asap.com	9000000012	psw	2	t	2026-04-25 00:02:27.033813	DIR	active
85f847dc-bb7e-4c5a-b8ab-042b723f8e12	student13@asap.com	9000000013	psw	2	t	2026-04-25 00:02:27.035297	DIR	active
2ee2cca2-8a44-48e2-a80b-e7cf123a3dab	student14@asap.com	9000000014	psw	2	t	2026-04-25 00:02:27.036819	DIR	active
fa902c22-8719-40e8-82bf-dca56550f09c	student15@asap.com	9000000015	psw	2	t	2026-04-25 00:02:27.038185	DIR	active
e21b90ff-d103-497f-964d-b3865b437e12	student16@asap.com	9000000016	psw	2	t	2026-04-25 00:02:27.040322	DIR	active
d2a264e9-5b50-4a6b-95de-7c2afe3fa5d6	student17@asap.com	9000000017	psw	2	t	2026-04-25 00:02:27.04405	DIR	active
3903a5e7-9dac-40c8-aeec-9761beafd8cd	student18@asap.com	9000000018	psw	2	t	2026-04-25 00:02:27.046019	DIR	active
55a655c3-20fc-4214-8646-167a355d3956	student19@asap.com	9000000019	psw	2	t	2026-04-25 00:02:27.047425	DIR	active
e8536176-90bd-4a51-b49d-53bba89d5b7e	student20@asap.com	9000000020	psw	2	t	2026-04-25 00:02:27.048652	DIR	active
d3560622-6bdc-43d3-a965-6ccca4a27570	student21@asap.com	9000000021	psw	2	t	2026-04-25 00:02:27.050506	DIR	active
dde222de-e237-4b29-80a6-47613792c588	student22@asap.com	9000000022	psw	2	t	2026-04-25 00:02:27.051954	DIR	active
3d01be7d-84c1-4e3e-b90a-b16e849cd7da	student23@asap.com	9000000023	psw	2	t	2026-04-25 00:02:27.053366	DIR	active
edae9f11-5a94-4705-a49a-cadf558245e8	student24@asap.com	9000000024	psw	2	t	2026-04-25 00:02:27.05467	DIR	active
eb86b57a-53bf-4f31-80bd-72dab44678f4	student25@asap.com	9000000025	psw	2	t	2026-04-25 00:02:27.056024	DIR	active
fe9573a1-5e99-4220-8898-bd236ea02f11	student26@asap.com	9000000026	psw	2	t	2026-04-25 00:02:27.057315	DIR	active
9769b3e7-ad2d-46ff-9f08-a5c48384edb1	student27@asap.com	9000000027	psw	2	t	2026-04-25 00:02:27.059146	DIR	active
a05efdd0-f9eb-489f-ad19-5ceb7287bde7	student28@asap.com	9000000028	psw	2	t	2026-04-25 00:02:27.060532	DIR	active
179183bd-ab01-4cbe-8385-68683d665f3d	student29@asap.com	9000000029	psw	2	t	2026-04-25 00:02:27.113994	DIR	active
6fc4027d-8145-4571-850d-c67be9195492	student30@asap.com	9000000030	psw	2	t	2026-04-25 00:02:27.117496	DIR	active
eac92d26-be49-4204-b4fe-3484198ca956	student31@asap.com	9000000031	psw	2	t	2026-04-25 00:02:27.120178	DIR	active
d09fb8bb-8dfb-4718-8024-519a45cbe6e1	student32@asap.com	9000000032	psw	2	t	2026-04-25 00:02:27.122959	DIR	active
96b26cd1-b701-489c-89ea-43b757134dc7	student33@asap.com	9000000033	psw	2	t	2026-04-25 00:02:27.125521	DIR	active
15332fe0-b2dc-44b4-be02-309b2dc532fb	student34@asap.com	9000000034	psw	2	t	2026-04-25 00:02:27.1281	DIR	active
50930d7a-a445-4419-a66a-592b6896e1f7	student35@asap.com	9000000035	psw	2	t	2026-04-25 00:02:27.130797	DIR	active
4df3ff04-d9f2-43e8-bd05-045454d34d59	student36@asap.com	9000000036	psw	2	t	2026-04-25 00:02:27.133282	DIR	active
8cb0d427-1c8d-4ec2-a117-058ca91204d7	student37@asap.com	9000000037	psw	2	t	2026-04-25 00:02:27.135778	DIR	active
1b70e77d-757f-4327-ac42-f4cb3b27e847	student38@asap.com	9000000038	psw	2	t	2026-04-25 00:02:27.13849	DIR	active
170d21ec-8b62-48c1-965e-6c925a4f50c8	student39@asap.com	9000000039	psw	2	t	2026-04-25 00:02:27.140819	DIR	active
d054d3bb-e5b8-4f7a-a518-0bfc6376e74e	student51@asap.com	9000000051	psw	2	t	2026-04-25 00:02:27.179323	DIR	active
87e4610f-063d-405a-a0ad-50d4c07e24b1	student52@asap.com	9000000052	psw	2	t	2026-04-25 00:02:27.18193	DIR	active
fedd8ea3-b162-4ceb-aa04-2d82d9a87e4f	student53@asap.com	9000000053	psw	2	t	2026-04-25 00:02:27.184686	DIR	active
06b827e0-637a-4b4d-995f-9f277fda9a35	student54@asap.com	9000000054	psw	2	t	2026-04-25 00:02:27.187166	DIR	active
d52fead8-f629-407e-aece-17a3c3ba25d8	student55@asap.com	9000000055	psw	2	t	2026-04-25 00:02:27.189788	DIR	active
75518f70-e1fc-4fd1-b459-ddc73a19757e	student56@asap.com	9000000056	psw	2	t	2026-04-25 00:02:27.192315	DIR	active
d5ac58de-5824-4d57-ba39-3529b1a75478	student57@asap.com	9000000057	psw	2	t	2026-04-25 00:02:27.194887	DIR	active
5b8d22af-22c2-41ca-90f4-c697e8bbd012	student58@asap.com	9000000058	psw	2	t	2026-04-25 00:02:27.197821	DIR	active
81df0926-0792-48a1-9c9d-093c1034a5d0	student59@asap.com	9000000059	psw	2	t	2026-04-25 00:02:27.201013	DIR	active
4044ad03-9302-4494-a76d-a640fed151a6	student60@asap.com	9000000060	psw	2	t	2026-04-25 00:02:27.20473	DIR	active
163cda4e-7ba2-41b3-94e8-e00fc8dcd74d	student61@asap.com	9000000061	psw	2	t	2026-04-25 00:02:27.20764	DIR	active
76828d86-5f88-4d26-84ba-ac4467e8e41b	student62@asap.com	9000000062	psw	2	t	2026-04-25 00:02:27.210616	DIR	active
3322c112-b988-4358-bab2-2164bd17ac8f	student63@asap.com	9000000063	psw	2	t	2026-04-25 00:02:27.214436	DIR	active
361427d0-0e7b-472d-93bf-5a9b7b493393	student64@asap.com	9000000064	psw	2	t	2026-04-25 00:02:27.216989	DIR	active
b1dae146-6839-415b-8afc-3a61730549f8	student65@asap.com	9000000065	psw	2	t	2026-04-25 00:02:27.230631	DIR	active
6eb04816-bb58-497b-afa3-e60413fa1ca9	student66@asap.com	9000000066	psw	2	t	2026-04-25 00:02:27.233923	DIR	active
168a6460-8a67-4ca2-824f-714889b4dba8	student67@asap.com	9000000067	psw	2	t	2026-04-25 00:02:27.236648	DIR	active
3d7d3785-8e19-40c8-b3cd-34e194e6f002	student68@asap.com	9000000068	psw	2	t	2026-04-25 00:02:27.240463	DIR	active
031ad19c-5d4f-459c-ae08-5ced6c085798	student69@asap.com	9000000069	psw	2	t	2026-04-25 00:02:27.243271	DIR	active
79daac85-215d-4e36-9579-8f5eed9dc6ad	student70@asap.com	9000000070	psw	2	t	2026-04-25 00:02:27.245811	DIR	active
dc71afdf-376c-4e6a-8780-7ba2033d9925	student71@asap.com	9000000071	psw	2	t	2026-04-25 00:02:27.248302	DIR	active
1a061fe3-8014-4e58-b2c6-7939346fb2b7	student72@asap.com	9000000072	psw	2	t	2026-04-25 00:02:27.251151	DIR	active
eebef3cd-d280-4e74-8029-32acadc65a73	student73@asap.com	9000000073	psw	2	t	2026-04-25 00:02:27.253801	DIR	active
4d20624e-4884-4ca1-9896-7eed7b22da39	student74@asap.com	9000000074	psw	2	t	2026-04-25 00:02:27.256302	DIR	active
33b128e5-8507-40ad-9333-b6f4f10f94af	student75@asap.com	9000000075	psw	2	t	2026-04-25 00:02:27.258921	DIR	active
b93e4374-84fa-454a-a23a-a656e6ed213f	student76@asap.com	9000000076	psw	2	t	2026-04-25 00:02:27.261431	DIR	active
391b2952-48b6-4c79-a0d5-48e23828fee4	student77@asap.com	9000000077	psw	2	t	2026-04-25 00:02:27.26449	DIR	active
159e477d-1f88-427c-87c8-e325f08f91f9	student78@asap.com	9000000078	psw	2	t	2026-04-25 00:02:27.26764	DIR	active
29c952eb-49e0-4216-9af2-5e22813f0ffa	student79@asap.com	9000000079	psw	2	t	2026-04-25 00:02:27.270533	DIR	active
796fa084-911d-4332-882f-65ae375f24c0	student80@asap.com	9000000080	psw	2	t	2026-04-25 00:02:27.273022	DIR	active
85be042b-a5e4-47be-9f3a-63d0400d5940	student81@asap.com	9000000081	psw	2	t	2026-04-25 00:02:27.275598	DIR	active
e42377fe-b121-4633-b52f-25407d8d0a66	student82@asap.com	9000000082	psw	2	t	2026-04-25 00:02:27.278598	DIR	active
160ba29b-5596-48c1-903c-3935d571f7b6	student83@asap.com	9000000083	psw	2	t	2026-04-25 00:02:27.282128	DIR	active
1dd8f2a5-7184-4e01-9fe2-86ff94748844	student84@asap.com	9000000084	psw	2	t	2026-04-25 00:02:27.28526	DIR	active
a85dd98e-ea75-42b8-ad4b-f4352f5d8693	student85@asap.com	9000000085	psw	2	t	2026-04-25 00:02:27.287548	DIR	active
406c0a45-d434-4bb8-a0ea-1801116330c7	student86@asap.com	9000000086	psw	2	t	2026-04-25 00:02:27.290454	DIR	active
89342145-9fe6-4a1c-93d3-4b4318d0de35	student87@asap.com	9000000087	psw	2	t	2026-04-25 00:02:27.293155	DIR	active
3b70fdc8-7c37-4a98-a21e-4d8575647f27	student88@asap.com	9000000088	psw	2	t	2026-04-25 00:02:27.295538	DIR	active
228961cd-a280-4d84-b60a-d0ceab6aa254	student89@asap.com	9000000089	psw	2	t	2026-04-25 00:02:27.298573	DIR	active
09b9e62a-b81f-4f59-9a97-4e8d0d894d32	student90@asap.com	9000000090	psw	2	t	2026-04-25 00:02:27.301346	DIR	active
251f7a65-3370-48c1-a6f8-5800901f815b	student91@asap.com	9000000091	psw	2	t	2026-04-25 00:02:27.304212	DIR	active
4aa47770-0bb2-497f-bfab-bb6340f90443	student92@asap.com	9000000092	psw	2	t	2026-04-25 00:02:27.306537	DIR	active
6f1772d3-1dc3-47e9-9f51-0db07d7d7922	student93@asap.com	9000000093	psw	2	t	2026-04-25 00:02:27.309737	DIR	active
d6796332-a30c-4bff-84e3-350aa9f6cf67	student94@asap.com	9000000094	psw	2	t	2026-04-25 00:02:27.31226	DIR	active
f5885e50-1085-465a-abc8-03de11ea41dd	student95@asap.com	9000000095	psw	2	t	2026-04-25 00:02:27.314788	DIR	active
96a28970-3e9e-4393-8d45-82c11681780c	student96@asap.com	9000000096	psw	2	t	2026-04-25 00:02:27.317545	DIR	active
1f8a7f92-e303-4a3e-a0c3-4e806bac6086	student97@asap.com	9000000097	psw	2	t	2026-04-25 00:02:27.319941	DIR	active
fd991a67-531f-43ed-ac82-b1a5cea261a6	student98@asap.com	9000000098	psw	2	t	2026-04-25 00:02:27.322249	DIR	active
c32c9a23-6e59-46fc-b3f6-730a7c258015	student99@asap.com	9000000099	psw	2	t	2026-04-25 00:02:27.324486	DIR	active
bdcd1e8d-a4d9-453a-a0b8-bcc7ebc7796b	student100@asap.com	9000000100	psw	2	t	2026-04-25 00:02:27.326951	DIR	active
ad271ece-bb08-4679-8458-74e043921ffe	student101@asap.com	9000000101	psw	2	t	2026-04-25 00:02:27.362942	DIR	active
006f6ec5-ae77-46b1-b0a3-2680d898f65a	student102@asap.com	9000000102	psw	2	t	2026-04-25 00:02:27.364978	DIR	active
27eabded-e99e-41a7-94d1-fb3e9c297ba8	student103@asap.com	9000000103	psw	2	t	2026-04-25 00:02:27.367042	DIR	active
4aee5ab1-c26c-4326-8789-b7acaa26c4a8	student104@asap.com	9000000104	psw	2	t	2026-04-25 00:02:27.368496	DIR	active
9a9d869a-e7e5-434e-ac88-fa5698130f26	student105@asap.com	9000000105	psw	2	t	2026-04-25 00:02:27.37001	DIR	active
445e5fcf-6fcc-4cd8-a700-f01123678b6f	student106@asap.com	9000000106	psw	2	t	2026-04-25 00:02:27.371405	DIR	active
2dc87229-a878-437f-8a20-1f1b39b20aca	student107@asap.com	9000000107	psw	2	t	2026-04-25 00:02:27.372903	DIR	active
6e708929-208d-4447-8b93-5869515d468f	student108@asap.com	9000000108	psw	2	t	2026-04-25 00:02:27.37422	DIR	active
3beabaa4-c574-430d-934b-3c918146da48	student109@asap.com	9000000109	psw	2	t	2026-04-25 00:02:27.375513	DIR	active
636e0925-35ed-4d06-895f-b74cfd100f36	student110@asap.com	9000000110	psw	2	t	2026-04-25 00:02:27.377131	DIR	active
b0b4201b-0b7a-4dfe-b514-c3aa20edf6e0	studentname100117770582925830@asap.com	919876543200	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
d0526a12-b2c5-48ac-9dff-d06d4aa7590d	studentname100217770582925991@asap.com	919876543199	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
9fa053b7-1ed5-4452-9fa6-9b1b74370cee	studentname100317770582926062@asap.com	919876543198	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
162e8de6-9ee6-4757-a95e-1e219f284244	studentname100417770582926113@asap.com	919876543197	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
93b706d8-797f-4ea1-b063-2aab4df7017c	studentname100517770582926154@asap.com	919876543196	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
01ee918e-5ceb-4019-9066-dc11d89e2960	studentname100617770582926195@asap.com	919876543195	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
925267d8-3945-457b-89b4-f9517cb42f35	studentname100717770582926256@asap.com	919876543194	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
53d46996-bcf4-4c09-b795-0870b8572a6c	studentname100817770582926327@asap.com	919876543193	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
a907cc9e-e59d-47f8-a60f-d3c98df6b329	studentname100917770582926388@asap.com	919876543192	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
36aa128d-bfcd-49c5-b3cd-d0b04583d509	studentname101017770582926439@asap.com	919876543191	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
46654348-2d38-4522-bdbf-0ed2bfec300f	studentname1011177705829264810@asap.com	919876543190	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
5e6ca54f-08c8-498b-890e-92e4056eb9ba	studentname1012177705829265211@asap.com	919876543189	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
c6c059bf-6a85-48dd-897e-f2327a0b234a	studentname1013177705829265912@asap.com	919876543188	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
38a56cf9-e975-4e46-867c-42212baed1d8	studentname1014177705829266413@asap.com	919876543187	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
4a6b676d-9909-48a3-a0cb-1f37cd6d39ca	studentname1015177705829267014@asap.com	919876543186	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
4fea842c-72aa-4cf4-92e1-869ca23fbd6a	studentname1016177705829267615@asap.com	919876543185	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
1f4814c4-d4e4-49db-8ebe-5dd9a2b4525b	studentname1017177705829268216@asap.com	919876543184	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
012911c5-0cf2-445e-aff6-bc4781ccf538	studentname1018177705829268917@asap.com	919876543183	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
32fb97ec-1c95-491c-b691-3385d4c250a9	studentname1019177705829269518@asap.com	919876543182	psw	2	t	2026-04-25 00:48:12.584396	DIR	active
137204e4-526f-410f-a07c-16c64a71bfbe	finance@asapkerala.gov.in	9999999999	psw	43	t	2026-04-25 01:54:37.194934	ALL	active
\.


--
-- Name: memberships_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.memberships_id_seq', 25, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 44, true);


--
-- Name: batches batches_batch_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.batches
    ADD CONSTRAINT batches_batch_code_key UNIQUE (batch_code);


--
-- Name: batches batches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.batches
    ADD CONSTRAINT batches_pkey PRIMARY KEY (id);


--
-- Name: corporates corporates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.corporates
    ADD CONSTRAINT corporates_pkey PRIMARY KEY (id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: enrollments enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_pkey PRIMARY KEY (id);


--
-- Name: feedbacks feedbacks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT feedbacks_pkey PRIMARY KEY (id);


--
-- Name: finance_audit_logs finance_audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finance_audit_logs
    ADD CONSTRAINT finance_audit_logs_pkey PRIMARY KEY (id);


--
-- Name: finance_bank_records finance_bank_records_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finance_bank_records
    ADD CONSTRAINT finance_bank_records_pkey PRIMARY KEY (id);


--
-- Name: finance_budgets finance_budgets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finance_budgets
    ADD CONSTRAINT finance_budgets_pkey PRIMARY KEY (id);


--
-- Name: finance_budgets finance_budgets_vertical_financial_year_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finance_budgets
    ADD CONSTRAINT finance_budgets_vertical_financial_year_key UNIQUE (vertical, financial_year);


--
-- Name: finance_donor_funds finance_donor_funds_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finance_donor_funds
    ADD CONSTRAINT finance_donor_funds_pkey PRIMARY KEY (id);


--
-- Name: finance_requisitions finance_requisitions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finance_requisitions
    ADD CONSTRAINT finance_requisitions_pkey PRIMARY KEY (id);


--
-- Name: finance_salaries finance_salaries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finance_salaries
    ADD CONSTRAINT finance_salaries_pkey PRIMARY KEY (id);


--
-- Name: finance_transactions finance_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finance_transactions
    ADD CONSTRAINT finance_transactions_pkey PRIMARY KEY (id);


--
-- Name: finance_utilisations finance_utilisations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finance_utilisations
    ADD CONSTRAINT finance_utilisations_pkey PRIMARY KEY (id);


--
-- Name: lessons lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_pkey PRIMARY KEY (id);


--
-- Name: memberships memberships_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_pkey PRIMARY KEY (id);


--
-- Name: mentorship_slots mentorship_slots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentorship_slots
    ADD CONSTRAINT mentorship_slots_pkey PRIMARY KEY (id);


--
-- Name: partners partners_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partners
    ADD CONSTRAINT partners_pkey PRIMARY KEY (id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: skill_coin_transactions skill_coin_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skill_coin_transactions
    ADD CONSTRAINT skill_coin_transactions_pkey PRIMARY KEY (id);


--
-- Name: students students_aadhaar_hash_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_aadhaar_hash_key UNIQUE (aadhaar_hash);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: students students_student_tag_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_student_tag_id_key UNIQUE (student_tag_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_mobile_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_mobile_key UNIQUE (mobile);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: batches batches_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.batches
    ADD CONSTRAINT batches_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id);


--
-- Name: enrollments enrollments_batch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES public.batches(id);


--
-- Name: enrollments enrollments_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: feedbacks feedbacks_enrollment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT feedbacks_enrollment_id_fkey FOREIGN KEY (enrollment_id) REFERENCES public.enrollments(id);


--
-- Name: finance_audit_logs finance_audit_logs_performed_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finance_audit_logs
    ADD CONSTRAINT finance_audit_logs_performed_by_fkey FOREIGN KEY (performed_by) REFERENCES public.users(id);


--
-- Name: finance_requisitions finance_requisitions_approved_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finance_requisitions
    ADD CONSTRAINT finance_requisitions_approved_by_id_fkey FOREIGN KEY (approved_by_id) REFERENCES public.users(id);


--
-- Name: finance_requisitions finance_requisitions_raised_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finance_requisitions
    ADD CONSTRAINT finance_requisitions_raised_by_id_fkey FOREIGN KEY (raised_by_id) REFERENCES public.users(id);


--
-- Name: finance_salaries finance_salaries_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finance_salaries
    ADD CONSTRAINT finance_salaries_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: finance_transactions finance_transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finance_transactions
    ADD CONSTRAINT finance_transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: finance_utilisations finance_utilisations_requisition_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finance_utilisations
    ADD CONSTRAINT finance_utilisations_requisition_id_fkey FOREIGN KEY (requisition_id) REFERENCES public.finance_requisitions(id);


--
-- Name: finance_utilisations finance_utilisations_submitted_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finance_utilisations
    ADD CONSTRAINT finance_utilisations_submitted_by_id_fkey FOREIGN KEY (submitted_by_id) REFERENCES public.users(id);


--
-- Name: finance_utilisations finance_utilisations_verified_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finance_utilisations
    ADD CONSTRAINT finance_utilisations_verified_by_id_fkey FOREIGN KEY (verified_by_id) REFERENCES public.users(id);


--
-- Name: lessons lessons_batch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES public.batches(id);


--
-- Name: mentorship_slots mentorship_slots_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentorship_slots
    ADD CONSTRAINT mentorship_slots_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: skill_coin_transactions skill_coin_transactions_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skill_coin_transactions
    ADD CONSTRAINT skill_coin_transactions_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: students students_membership_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_membership_id_fkey FOREIGN KEY (membership_id) REFERENCES public.memberships(id);


--
-- Name: students students_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- PostgreSQL database dump complete
--

\unrestrict ePa4bnGGmIVjHr351uS7wp3G7hoRehNJhstNDH9PHCVWGyWaPs2bTggKMWT6ZeM

