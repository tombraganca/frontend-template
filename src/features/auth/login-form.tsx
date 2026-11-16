import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { EyeIcon, EyeOffIcon, InfoIcon, TriangleAlertIcon } from "lucide-react";
import { useState } from "react";
import * as z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { isMockAuth } from "./auth-client";
import { MOCK_CREDENTIALS } from "./mock-auth-client";
import { useLogin } from "./queries";
import { safeRedirect } from "./safe-redirect";

const loginSchema = z.object({
	email: z.email("Enter a valid email address."),
	password: z.string().min(1, "Enter your password."),
});

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
	const navigate = useNavigate();
	const login = useLogin();
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm({
		defaultValues: { email: "", password: "" },
		validators: { onSubmit: loginSchema },
		onSubmit: async ({ value }) => {
			login.reset();
			await login.mutateAsync(value).then(
				() => navigate({ to: safeRedirect(redirectTo), replace: true }),
				() => {}, // the error is rendered from `login.error`
			);
		},
	});

	return (
		<form
			noValidate
			onSubmit={(event) => {
				event.preventDefault();
				form.handleSubmit();
			}}
		>
			<FieldGroup>
				{login.error && (
					<Alert variant="destructive">
						<TriangleAlertIcon />
						<AlertTitle>Couldn't sign you in</AlertTitle>
						<AlertDescription>{login.error.message}</AlertDescription>
					</Alert>
				)}

				<form.Field name="email">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Email</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									type="email"
									autoComplete="email"
									placeholder="you@example.com"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
									aria-invalid={isInvalid}
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				</form.Field>

				<form.Field name="password">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Password</FieldLabel>
								<InputGroup>
									<InputGroupInput
										id={field.name}
										name={field.name}
										type={showPassword ? "text" : "password"}
										autoComplete="current-password"
										placeholder="••••••••"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(event) => field.handleChange(event.target.value)}
										aria-invalid={isInvalid}
									/>
									<InputGroupAddon align="inline-end">
										<InputGroupButton
											size="icon-xs"
											aria-label={
												showPassword ? "Hide password" : "Show password"
											}
											aria-pressed={showPassword}
											onClick={() => setShowPassword((visible) => !visible)}
										>
											{showPassword ? <EyeOffIcon /> : <EyeIcon />}
										</InputGroupButton>
									</InputGroupAddon>
								</InputGroup>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				</form.Field>

				<Button type="submit" size="lg" disabled={login.isPending}>
					{login.isPending && <Spinner data-icon="inline-start" />}
					Sign in
				</Button>

				{isMockAuth && (
					<Alert>
						<InfoIcon />
						<AlertTitle>Demo mode</AlertTitle>
						<AlertDescription>
							Use {MOCK_CREDENTIALS.email} / {MOCK_CREDENTIALS.password}. Set
							VITE_API_URL to connect your backend.
						</AlertDescription>
					</Alert>
				)}
			</FieldGroup>
		</form>
	);
}
