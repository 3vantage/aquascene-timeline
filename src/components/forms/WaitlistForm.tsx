'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { waitlistSchema, WaitlistFormData } from '@/lib/validations';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import Select from '@/components/ui/Select';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animation-config';
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  SparklesIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

interface WaitlistFormProps {
  className?: string;
}

interface SubmissionResult {
  success: boolean;
  position?: number;
  error?: string;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ className = '' }) => {
  const t = useTranslations('waitlist.form');
  const tSuccess = useTranslations('waitlist.success');
  const tErrors = useTranslations('waitlist.errors');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    mode: 'onChange',
    defaultValues: {
      interests: [],
      gdprConsent: false,
      marketingConsent: false,
    }
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionResult({
          success: true,
          position: result.position
        });
        reset();
      } else {
        setSubmissionResult({
          success: false,
          error: result.message || tErrors('generic')
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionResult({
        success: false,
        error: tErrors('generic')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const experienceOptions = [
    { value: 'beginner', label: t('experience.options.beginner') },
    { value: 'intermediate', label: t('experience.options.intermediate') },
    { value: 'advanced', label: t('experience.options.advanced') },
    { value: 'professional', label: t('experience.options.professional') },
  ];

  const interestOptions = [
    { id: '3d_design' as const, label: t('interests.3d_design') },
    { id: 'calculations' as const, label: t('interests.calculations') },
    { id: 'community' as const, label: t('interests.community') },
    { id: 'mobile_app' as const, label: t('interests.mobile_app') },
    { id: 'ai_assistant' as const, label: t('interests.ai_assistant') },
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '3vantage Aquascaping',
          text: 'Join me on the 3vantage aquascaping platform waitlist!',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Success state component
  if (submissionResult?.success) {
    return (
      <motion.div
        className={`glass-deep-water p-8 rounded-2xl ${className}`}
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <div className="text-center">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-success to-accent-emerald rounded-full mb-6"
            animate={{ scale: [0, 1.2, 1], rotate: [0, 360, 360] }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <CheckCircleIcon className="w-8 h-8 text-white" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-white mb-4">
            {tSuccess('title')}
          </h3>
          
          <p className="text-white/80 mb-6">
            {tSuccess('message')}
          </p>
          
          {submissionResult.position && (
            <motion.div
              className="glass-underwater p-4 rounded-xl mb-6"
              animate={{ scale: [0.95, 1.05, 1] }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-accent-emerald font-bold text-lg">
                {tSuccess('position', { position: submissionResult.position })}
              </div>
            </motion.div>
          )}
          
          <p className="text-white/70 text-sm mb-8">
            {tSuccess('next')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              onClick={handleShare}
              leftIcon={<ShareIcon className="w-4 h-4" />}
              className="glass-underwater border-white/30 text-white hover:bg-white/10"
            >
              {tSuccess('share')}
            </Button>
            
            <Button
              onClick={() => setSubmissionResult(null)}
              className="bg-gradient-to-r from-accent-emerald to-primary"
            >
              Join Another Person
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      className={`glass-deep-water p-8 rounded-2xl ${className}`}
      onSubmit={handleSubmit(onSubmit)}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Error display */}
      <AnimatePresence>
        {submissionResult?.error && (
          <motion.div
            className="flex items-center gap-3 bg-error/10 border border-error/30 rounded-lg p-4 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ExclamationCircleIcon className="w-5 h-5 text-error flex-shrink-0" />
            <span className="text-error text-sm">{submissionResult.error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {/* Name field */}
        <motion.div variants={staggerItem}>
          <Input
            {...register('name')}
            label={t('name.label')}
            placeholder={t('name.placeholder')}
            variant="underwater"
            error={errors.name?.message}
            leftIcon={<SparklesIcon className="w-5 h-5" />}
          />
        </motion.div>

        {/* Email field */}
        <motion.div variants={staggerItem}>
          <Input
            {...register('email')}
            type="email"
            label={t('email.label')}
            placeholder={t('email.placeholder')}
            variant="underwater"
            error={errors.email?.message}
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            }
          />
        </motion.div>

        {/* Experience level */}
        <motion.div variants={staggerItem}>
          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label={t('experience.label')}
                placeholder={t('experience.placeholder')}
                options={experienceOptions}
                error={errors.experience?.message}
                variant="underwater"
              />
            )}
          />
        </motion.div>

        {/* Interests */}
        <motion.div variants={staggerItem}>
          <label className="block text-sm font-medium text-white/90 mb-4">
            {t('interests.label')}
          </label>
          <div className="space-y-3">
            {interestOptions.map((option) => (
              <Controller
                key={option.id}
                name="interests"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id={option.id}
                    checked={field.value?.includes(option.id)}
                    onChange={(checked) => {
                      const currentValues = field.value || [];
                      if (checked) {
                        field.onChange([...currentValues, option.id]);
                      } else {
                        field.onChange(
                          currentValues.filter((value) => value !== option.id)
                        );
                      }
                    }}
                    label={option.label}
                    variant="underwater"
                  />
                )}
              />
            ))}
          </div>
          {errors.interests && (
            <p className="text-error text-sm mt-2">{errors.interests.message}</p>
          )}
        </motion.div>

        {/* GDPR Consent */}
        <motion.div variants={staggerItem}>
          <Controller
            name="gdprConsent"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="gdpr-consent"
                checked={field.value}
                onChange={field.onChange}
                label={
                  <span className="text-sm">
                    {t('gdpr.consent')}{' '}
                    <a 
                      href="/privacy" 
                      className="text-accent-emerald hover:underline"
                      target="_blank"
                    >
                      {t('gdpr.privacy')}
                    </a>
                  </span>
                }
                variant="underwater"
                required
              />
            )}
          />
          {errors.gdprConsent && (
            <p className="text-error text-sm mt-2">{errors.gdprConsent.message}</p>
          )}
        </motion.div>

        {/* Marketing consent (optional) */}
        <motion.div variants={staggerItem}>
          <Controller
            name="marketingConsent"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="marketing-consent"
                checked={field.value || false}
                onChange={field.onChange}
                label={<span className="text-sm">{t('gdpr.marketing')}</span>}
                variant="underwater"
              />
            )}
          />
        </motion.div>

        {/* Honeypot field (hidden) */}
        <input
          {...register('honeypot')}
          type="text"
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Submit button */}
        <motion.div variants={staggerItem}>
          <Button
            type="submit"
            size="xl"
            fullWidth
            isLoading={isSubmitting}
            disabled={!isValid || isSubmitting}
            className="bg-gradient-to-r from-accent-emerald to-primary shadow-2xl hover:shadow-emerald/50"
          >
            {isSubmitting ? t('submitting') : t('submit')}
          </Button>
        </motion.div>
      </div>
    </motion.form>
  );
};

WaitlistForm.displayName = 'WaitlistForm';

export default WaitlistForm;