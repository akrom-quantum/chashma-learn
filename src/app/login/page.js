const handleGoogle = async () => {
  try {
    setLoading(true);
    await signInWithGoogle();
    router.push("/dashboard");
  } catch (err) {
    setError(err.message);
    setLoading(false);
  }
};
