"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Calendar, Users, GraduationCap, FileText, Briefcase, School, Trophy } from 'lucide-react'
import { motion } from "framer-motion"
import { Head, Link } from '@inertiajs/react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <School className="h-10 w-10 text-indigo-600" />
            <span className="ml-2 text-2xl font-bold text-indigo-600">PFE Platform</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-indigo-600">About</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">Projects</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">Supervisors</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">Resources</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">Contact</a>
          </div>
          <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>

                                    </>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-indigo-600 font-medium">ACADEMIC EXCELLENCE</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Final Year Project Management Platform</h1>
            <p className="text-gray-600 mb-8">
              Streamline your final year project journey with our comprehensive platform. Connect with supervisors, manage proposals, and track your progress all in one place.
            </p>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Get Started
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-indigo-600 rounded-full w-[400px] h-[400px] mx-auto overflow-hidden">
              <img 
                src="/placeholder.svg?height=400&width=400" 
                alt="Students and Supervisors" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: Calendar,
              title: "Project Timeline",
              description: "Track important deadlines and milestones",
              color: "bg-indigo-600"
            },
            {
              icon: Users,
              title: "Supervision",
              description: "Connect with expert supervisors",
              color: "bg-white"
            },
            {
              icon: FileText,
              title: "Proposals",
              description: "Submit and manage project proposals",
              color: "bg-white"
            },
            {
              icon: Trophy,
              title: "Track Progress",
              description: "Monitor your project development",
              color: "bg-white"
            }
          ].map((feature, index) => (
            <Card 
              key={index}
              className={`${feature.color} ${index === 0 ? 'text-white' : 'text-gray-800'} transition-transform hover:scale-105`}
            >
              <CardContent className="p-6">
                <feature.icon className={`w-8 h-8 ${index === 0 ? 'text-white' : 'text-indigo-600'}`} />
                <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
                <p className={`mt-2 text-sm ${index === 0 ? 'text-gray-100' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
                <Button 
                  variant={index === 0 ? "secondary" : "default"}
                  className={`mt-4 ${index === 0 ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'}`}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-medium">FEATURES</span>
          <h2 className="text-3xl font-bold mt-2">Platform Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="/placeholder.svg?height=500&width=400" 
              alt="Project Management" 
              className="w-full max-w-md mx-auto"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Project Management System</h3>
            <p className="text-gray-600 mb-6">
              Our comprehensive project management system helps you stay organized throughout your final year project. 
              Track deadlines, communicate with supervisors, and manage documentation all in one place.
            </p>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-medium">SUPERVISION</span>
          <h2 className="text-3xl font-bold mt-2">Expert Supervisors</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Prof. Sarah Johnson", specialty: "Computer Science" },
            { name: "Dr. Michael Chen", specialty: "Data Science" },
            { name: "Dr. Emily Brown", specialty: "Software Engineering" }
          ].map((supervisor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-indigo-600 rounded-lg p-4">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt={supervisor.name}
                      className="w-48 h-48 rounded-full mx-auto object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-lg">{supervisor.name}</h3>
                    <p className="text-gray-600">{supervisor.specialty}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            View All Supervisors
          </Button>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: BookOpen, value: "200+", label: "Active Projects" },
            { icon: Users, value: "50+", label: "Expert Supervisors" },
            { icon: GraduationCap, value: "1000+", label: "Students" },
            { icon: Briefcase, value: "100+", label: "Industry Partners" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6"
            >
              <stat.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

